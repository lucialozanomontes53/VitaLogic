import { Injectable, inject } from '@angular/core'
import { ShoppingItem } from '@domain/entities/shopping-item.entity'
import { IShoppingItemRepository, CreateShoppingItemData } from '@domain/repositories/shopping-item.repository'
import { SUPABASE_CLIENT } from '../supabase/supabase.client'

@Injectable()
export class SupabaseShoppingItemRepository implements IShoppingItemRepository {
  private readonly client = inject(SUPABASE_CLIENT)

  async getByUserId(userId: string): Promise<ShoppingItem[]> {
    const { data, error } = await this.client
      .from('shopping_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data.map(
      (r) =>
        new ShoppingItem(r.id, r.user_id, r.name, r.category, r.checked, new Date(r.created_at)),
    )
  }

  async create(d: CreateShoppingItemData): Promise<ShoppingItem> {
    const { data, error } = await this.client
      .from('shopping_items')
      .insert({ user_id: d.userId, name: d.name, category: d.category })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return new ShoppingItem(
      data.id, data.user_id, data.name, data.category, data.checked, new Date(data.created_at),
    )
  }

  async toggle(id: string, checked: boolean): Promise<void> {
    const { error } = await this.client
      .from('shopping_items')
      .update({ checked })
      .eq('id', id)
    if (error) throw new Error(error.message)
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from('shopping_items').delete().eq('id', id)
    if (error) throw new Error(error.message)
  }
}
