import { IAuthRepository, AuthSession } from '@domain/repositories/auth.repository'

export class GetCurrentSessionUseCase {
  constructor(private readonly repo: IAuthRepository) {}

  execute(): Promise<AuthSession | null> {
    return this.repo.getCurrentSession()
  }
}
