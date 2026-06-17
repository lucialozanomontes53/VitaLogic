import { InjectionToken } from '@angular/core'
import { Recipe, RecipeMacros } from '../entities/recipe.entity'

export interface CreateRecipeData {
  userId: string
  name: string
  cookedForId: string | null
  cookedForName: string
  macros: RecipeMacros
}

export interface IRecipeRepository {
  getByUserId(userId: string): Promise<Recipe[]>
  create(data: CreateRecipeData): Promise<Recipe>
  delete(id: string): Promise<void>
}

export const RECIPE_REPOSITORY =
  new InjectionToken<IRecipeRepository>('RECIPE_REPOSITORY')
