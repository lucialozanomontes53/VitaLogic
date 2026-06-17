import { IIngredientRepository } from '@domain/repositories/ingredient.repository'

export class DeleteIngredientUseCase {
  constructor(private readonly repo: IIngredientRepository) {}

  execute(id: string): Promise<void> {
    return this.repo.delete(id)
  }
}
