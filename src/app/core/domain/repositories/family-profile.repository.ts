import { InjectionToken } from '@angular/core'
import { FamilyProfile } from '../entities/family-profile.entity'

export interface IFamilyProfileRepository {
  getByUserId(userId: string): Promise<FamilyProfile[]>
  create(userId: string, name: string): Promise<FamilyProfile>
  delete(id: string): Promise<void>
}

export const FAMILY_PROFILE_REPOSITORY =
  new InjectionToken<IFamilyProfileRepository>('FAMILY_PROFILE_REPOSITORY')
