import { IIngredientRepository } from '@domain/repositories/ingredient.repository'
import { Ingredient } from '@domain/entities/ingredient.entity'

export class GetIngredientsUseCase {
  constructor(private readonly repo: IIngredientRepository) {}

  execute(userId: string): Promise<Ingredient[]> {
    return this.repo.getByUserId(userId)
  }
}
