import { IRecipeRepository } from '@domain/repositories/recipe.repository'

export class DeleteRecipeUseCase {
  constructor(private readonly repo: IRecipeRepository) {}

  execute(id: string): Promise<void> {
    return this.repo.delete(id)
  }
}
