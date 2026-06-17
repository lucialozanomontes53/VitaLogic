import { Injectable, inject } from '@angular/core'
import { Recipe } from '@domain/entities/recipe.entity'
import { IRecipeRepository, CreateRecipeData } from '@domain/repositories/recipe.repository'
import { SUPABASE_CLIENT } from '../supabase/supabase.client'

@Injectable()
export class SupabaseRecipeRepository implements IRecipeRepository {
  private readonly client = inject(SUPABASE_CLIENT)

  async getByUserId(userId: string): Promise<Recipe[]> {
    const { data, error } = await this.client
      .from('recipes')
      .select('*')
      .eq('user_id', userId)
      .order('cooked_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data.map(
      (r) =>
        new Recipe(
          r.id,
          r.user_id,
          r.name,
          r.cooked_for_id,
          r.cooked_for_name,
          { proteinsG: r.proteins_g, carbsG: r.carbs_g, vegetablesG: r.vegetables_g },
          new Date(r.cooked_at),
          new Date(r.created_at),
        ),
    )
  }

  async create(d: CreateRecipeData): Promise<Recipe> {
    const { data, error } = await this.client
      .from('recipes')
      .insert({
        user_id:         d.userId,
        name:            d.name,
        cooked_for_id:   d.cookedForId,
        cooked_for_name: d.cookedForName,
        proteins_g:      d.macros.proteinsG,
        carbs_g:         d.macros.carbsG,
        vegetables_g:    d.macros.vegetablesG,
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return new Recipe(
      data.id,
      data.user_id,
      data.name,
      data.cooked_for_id,
      data.cooked_for_name,
      { proteinsG: data.proteins_g, carbsG: data.carbs_g, vegetablesG: data.vegetables_g },
      new Date(data.cooked_at),
      new Date(data.created_at),
    )
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from('recipes').delete().eq('id', id)
    if (error) throw new Error(error.message)
  }
}
