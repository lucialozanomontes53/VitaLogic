import { IAuthRepository, AuthSession } from '@domain/repositories/auth.repository';
import { Email } from '@domain/value-objects/email.value-object';
import { Password } from '@domain/value-objects/password.value-object';
import { RegisterDto } from '../../dtos/register.dto';

export class RegisterUseCase {
  constructor(private readonly repo: IAuthRepository) {}

  async execute(dto: RegisterDto): Promise<AuthSession> {
    const email    = Email.create(dto.email);
    const password = Password.create(dto.password);
    return this.repo.register(email, password.value, dto.fullName);
  }
}
