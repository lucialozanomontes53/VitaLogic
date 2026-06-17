import { IRecipeRepository } from '@domain/repositories/recipe.repository'
import { Recipe } from '@domain/entities/recipe.entity'

export class GetRecipesUseCase {
  constructor(private readonly repo: IRecipeRepository) {}

  execute(userId: string): Promise<Recipe[]> {
    return this.repo.getByUserId(userId)
  }
}
