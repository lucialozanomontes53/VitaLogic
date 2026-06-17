import { Injectable, inject, signal } from '@angular/core'
import { ShoppingItem } from '@domain/entities/shopping-item.entity'
import { IngredientCategory } from '@domain/entities/ingredient.entity'
import { GetShoppingItemsUseCase } from '@application/use-cases/shopping-items/get-shopping-items.use-case'
import { CreateShoppingItemUseCase } from '@application/use-cases/shopping-items/create-shopping-item.use-case'
import { ToggleShoppingItemUseCase } from '@application/use-cases/shopping-items/toggle-shopping-item.use-case'
import { DeleteShoppingItemUseCase } from '@application/use-cases/shopping-items/delete-shopping-item.use-case'
import { AuthStore } from '@features/auth/state/auth.store'

@Injectable({ providedIn: 'root' })
export class ShoppingListStore {
  private readonly getUseCase    = inject(GetShoppingItemsUseCase)
  private readonly createUseCase = inject(CreateShoppingItemUseCase)
  private readonly toggleUseCase = inject(ToggleShoppingItemUseCase)
  private readonly deleteUseCase = inject(DeleteShoppingItemUseCase)
  private readonly authStore     = inject(AuthStore)

  readonly items   = signal<ShoppingItem[]>([])
  readonly loading = signal(false)
  readonly error   = signal<string | null>(null)

  async load(): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    this.loading.set(true)
    this.error.set(null)
    try {
      const list = await this.getUseCase.execute(userId)
      this.items.set(list)
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al cargar lista')
    } finally {
      this.loading.set(false)
    }
  }

  async add(name: string, category: IngredientCategory): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    try {
      const item = await this.createUseCase.execute({ userId, name, category })
      this.items.update((list) => [item, ...list])
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al añadir producto')
    }
  }

  async toggle(id: string): Promise<void> {
    const item = this.items().find((i) => i.id === id)
    if (!item) return
    const next = !item.checked
    this.items.update((list) =>
      list.map((i) =>
        i.id === id
          ? new ShoppingItem(i.id, i.userId, i.name, i.category, next, i.createdAt)
          : i,
      ),
    )
    try {
      await this.toggleUseCase.execute(id, next)
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al actualizar item')
      await this.load()
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.deleteUseCase.execute(id)
      this.items.update((list) => list.filter((i) => i.id !== id))
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al eliminar producto')
    }
  }
}
