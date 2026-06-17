import { IFamilyProfileRepository } from '@domain/repositories/family-profile.repository'
import { FamilyProfile } from '@domain/entities/family-profile.entity'

export class CreateFamilyProfileUseCase {
  constructor(private readonly repo: IFamilyProfileRepository) {}

  execute(userId: string, name: string): Promise<FamilyProfile> {
    return this.repo.create(userId, name)
  }
}
