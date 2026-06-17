import { IIngredientRepository, CreateIngredientData } from '@domain/repositories/ingredient.repository'
import { Ingredient } from '@domain/entities/ingredient.entity'

export class CreateIngredientUseCase {
  constructor(private readonly repo: IIngredientRepository) {}

  execute(data: CreateIngredientData): Promise<Ingredient> {
    return this.repo.create(data)
  }
}
