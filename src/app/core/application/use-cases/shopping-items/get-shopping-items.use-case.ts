import { IShoppingItemRepository } from '@domain/repositories/shopping-item.repository'
import { ShoppingItem } from '@domain/entities/shopping-item.entity'

export class GetShoppingItemsUseCase {
  constructor(private readonly repo: IShoppingItemRepository) {}

  execute(userId: string): Promise<ShoppingItem[]> {
    return this.repo.getByUserId(userId)
  }
}
