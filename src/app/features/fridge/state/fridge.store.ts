import { Injectable, inject, signal, computed } from '@angular/core'
import { Ingredient, IngredientCategory } from '@domain/entities/ingredient.entity'
import { GetIngredientsUseCase } from '@application/use-cases/ingredients/get-ingredients.use-case'
import { CreateIngredientUseCase } from '@application/use-cases/ingredients/create-ingredient.use-case'
import { DeleteIngredientUseCase } from '@application/use-cases/ingredients/delete-ingredient.use-case'
import { AuthStore } from '@features/auth/state/auth.store'

@Injectable({ providedIn: 'root' })
export class FridgeStore {
  private readonly getUseCase    = inject(GetIngredientsUseCase)
  private readonly createUseCase = inject(CreateIngredientUseCase)
  private readonly deleteUseCase = inject(DeleteIngredientUseCase)
  private readonly authStore     = inject(AuthStore)

  readonly ingredients = signal<Ingredient[]>([])
  readonly loading     = signal(false)
  readonly error       = signal<string | null>(null)

  readonly byCategory = computed(() => ({
    proteina:     this.ingredients().filter((i) => i.category === 'proteina'),
    carbohidrato: this.ingredients().filter((i) => i.category === 'carbohidrato'),
    verdura:      this.ingredients().filter((i) => i.category === 'verdura'),
  }))

  async load(): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    this.loading.set(true)
    this.error.set(null)
    try {
      const list = await this.getUseCase.execute(userId)
      this.ingredients.set(list)
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al cargar nevera')
    } finally {
      this.loading.set(false)
    }
  }

  async add(name: string, category: IngredientCategory): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    try {
      const item = await this.createUseCase.execute({ userId, name, category })
      this.ingredients.update((list) => [item, ...list])
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al añadir ingrediente')
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.deleteUseCase.execute(id)
      this.ingredients.update((list) => list.filter((i) => i.id !== id))
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al eliminar ingrediente')
    }
  }
}
