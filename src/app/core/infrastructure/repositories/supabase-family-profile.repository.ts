import { Injectable, inject } from '@angular/core'
import { FamilyProfile } from '@domain/entities/family-profile.entity'
import { IFamilyProfileRepository } from '@domain/repositories/family-profile.repository'
import { SUPABASE_CLIENT } from '../supabase/supabase.client'

@Injectable()
export class SupabaseFamilyProfileRepository implements IFamilyProfileRepository {
  private readonly client = inject(SUPABASE_CLIENT)

  async getByUserId(userId: string): Promise<FamilyProfile[]> {
    const { data, error } = await this.client
      .from('family_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)
    return data.map((r) => new FamilyProfile(r.id, r.user_id, r.name, new Date(r.created_at)))
  }

  async create(userId: string, name: string): Promise<FamilyProfile> {
    const { data, error } = await this.client
      .from('family_profiles')
      .insert({ user_id: userId, name })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return new FamilyProfile(data.id, data.user_id, data.name, new Date(data.created_at))
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from('family_profiles').delete().eq('id', id)
    if (error) throw new Error(error.message)
  }
}
