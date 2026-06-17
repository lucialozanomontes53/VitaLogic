import { IShoppingItemRepository, CreateShoppingItemData } from '@domain/repositories/shopping-item.repository'
import { ShoppingItem } from '@domain/entities/shopping-item.entity'

export class CreateShoppingItemUseCase {
  constructor(private readonly repo: IShoppingItemRepository) {}

  execute(data: CreateShoppingItemData): Promise<ShoppingItem> {
    return this.repo.create(data)
  }
}
