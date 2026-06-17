import { Injectable, inject, signal } from '@angular/core'
import { Recipe, RecipeMacros } from '@domain/entities/recipe.entity'
import { GetRecipesUseCase } from '@application/use-cases/recipes/get-recipes.use-case'
import { CreateRecipeUseCase } from '@application/use-cases/recipes/create-recipe.use-case'
import { DeleteRecipeUseCase } from '@application/use-cases/recipes/delete-recipe.use-case'
import { AuthStore } from '@features/auth/state/auth.store'

export interface CreateRecipeForm {
  name: string
  cookedForId: string | null
  cookedForName: string
  macros: RecipeMacros
}

@Injectable({ providedIn: 'root' })
export class RecipeHistoryStore {
  private readonly getUseCase    = inject(GetRecipesUseCase)
  private readonly createUseCase = inject(CreateRecipeUseCase)
  private readonly deleteUseCase = inject(DeleteRecipeUseCase)
  private readonly authStore     = inject(AuthStore)

  readonly recipes = signal<Recipe[]>([])
  readonly loading = signal(false)
  readonly error   = signal<string | null>(null)

  async load(): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    this.loading.set(true)
    this.error.set(null)
    try {
      const list = await this.getUseCase.execute(userId)
      this.recipes.set(list)
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al cargar historial')
    } finally {
      this.loading.set(false)
    }
  }

  async add(form: CreateRecipeForm): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    try {
      const recipe = await this.createUseCase.execute({
        userId,
        name:          form.name,
        cookedForId:   form.cookedForId,
        cookedForName: form.cookedForName,
        macros:        form.macros,
      })
      this.recipes.update((list) => [recipe, ...list])
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al guardar receta')
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.deleteUseCase.execute(id)
      this.recipes.update((list) => list.filter((r) => r.id !== id))
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al eliminar receta')
    }
  }
}
