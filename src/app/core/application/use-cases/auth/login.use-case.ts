import { IAuthRepository, AuthSession } from '@domain/repositories/auth.repository';
import { Email } from '@domain/value-objects/email.value-object';
import { LoginDto } from '../../dtos/login.dto';

export class LoginUseCase {
  constructor(private readonly repo: IAuthRepository) {}

  async execute(dto: LoginDto): Promise<AuthSession> {
    const email = Email.create(dto.email);
    return this.repo.login(email, dto.password);
  }
}
