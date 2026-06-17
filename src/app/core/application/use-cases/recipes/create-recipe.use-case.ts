import { IRecipeRepository, CreateRecipeData } from '@domain/repositories/recipe.repository'
import { Recipe } from '@domain/entities/recipe.entity'

export class CreateRecipeUseCase {
  constructor(private readonly repo: IRecipeRepository) {}

  execute(data: CreateRecipeData): Promise<Recipe> {
    return this.repo.create(data)
  }
}
