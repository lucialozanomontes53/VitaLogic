import { Injectable, inject } from '@angular/core'
import { Ingredient } from '@domain/entities/ingredient.entity'
import { IIngredientRepository, CreateIngredientData } from '@domain/repositories/ingredient.repository'
import { SUPABASE_CLIENT } from '../supabase/supabase.client'

@Injectable()
export class SupabaseIngredientRepository implements IIngredientRepository {
  private readonly client = inject(SUPABASE_CLIENT)

  async getByUserId(userId: string): Promise<Ingredient[]> {
    const { data, error } = await this.client
      .from('ingredients')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data.map(
      (r) => new Ingredient(r.id, r.user_id, r.name, r.category, new Date(r.created_at)),
    )
  }

  async create(d: CreateIngredientData): Promise<Ingredient> {
    const { data, error } = await this.client
      .from('ingredients')
      .insert({ user_id: d.userId, name: d.name, category: d.category })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return new Ingredient(data.id, data.user_id, data.name, data.category, new Date(data.created_at))
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from('ingredients').delete().eq('id', id)
    if (error) throw new Error(error.message)
  }
}
