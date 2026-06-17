import { IFamilyProfileRepository } from '@domain/repositories/family-profile.repository'
import { FamilyProfile } from '@domain/entities/family-profile.entity'

export class GetFamilyProfilesUseCase {
  constructor(private readonly repo: IFamilyProfileRepository) {}

  execute(userId: string): Promise<FamilyProfile[]> {
    return this.repo.getByUserId(userId)
  }
}
