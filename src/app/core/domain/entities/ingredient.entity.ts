export type IngredientCategory = 'proteina' | 'carbohidrato' | 'verdura'

export class Ingredient {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    readonly category: IngredientCategory,
    readonly createdAt: Date,
  ) {}
}
