import { IngredientCategory } from './ingredient.entity'

export class ShoppingItem {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    readonly category: IngredientCategory,
    readonly checked: boolean,
    readonly createdAt: Date,
  ) {}
}
