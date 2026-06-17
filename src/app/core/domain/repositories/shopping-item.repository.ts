import { InjectionToken } from '@angular/core'
import { ShoppingItem } from '../entities/shopping-item.entity'
import { IngredientCategory } from '../entities/ingredient.entity'

export interface CreateShoppingItemData {
  userId: string
  name: string
  category: IngredientCategory
}

export interface IShoppingItemRepository {
  getByUserId(userId: string): Promise<ShoppingItem[]>
  create(data: CreateShoppingItemData): Promise<ShoppingItem>
  toggle(id: string, checked: boolean): Promise<void>
  delete(id: string): Promise<void>
}

export const SHOPPING_ITEM_REPOSITORY =
  new InjectionToken<IShoppingItemRepository>('SHOPPING_ITEM_REPOSITORY')
