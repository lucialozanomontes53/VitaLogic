import { IShoppingItemRepository } from '@domain/repositories/shopping-item.repository'

export class DeleteShoppingItemUseCase {
  constructor(private readonly repo: IShoppingItemRepository) {}

  execute(id: string): Promise<void> {
    return this.repo.delete(id)
  }
}
