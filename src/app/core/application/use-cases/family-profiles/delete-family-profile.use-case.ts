import { IFamilyProfileRepository } from '@domain/repositories/family-profile.repository'

export class DeleteFamilyProfileUseCase {
  constructor(private readonly repo: IFamilyProfileRepository) {}

  execute(id: string): Promise<void> {
    return this.repo.delete(id)
  }
}
