import { IShoppingItemRepository } from '@domain/repositories/shopping-item.repository'

export class ToggleShoppingItemUseCase {
  constructor(private readonly repo: IShoppingItemRepository) {}

  execute(id: string, checked: boolean): Promise<void> {
    return this.repo.toggle(id, checked)
  }
}
