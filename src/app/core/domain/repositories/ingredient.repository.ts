import { InjectionToken } from '@angular/core'
import { Ingredient, IngredientCategory } from '../entities/ingredient.entity'

export interface CreateIngredientData {
  userId: string
  name: string
  category: IngredientCategory
}

export interface IIngredientRepository {
  getByUserId(userId: string): Promise<Ingredient[]>
  create(data: CreateIngredientData): Promise<Ingredient>
  delete(id: string): Promise<void>
}

export const INGREDIENT_REPOSITORY =
  new InjectionToken<IIngredientRepository>('INGREDIENT_REPOSITORY')
