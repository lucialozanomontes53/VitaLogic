import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUseCase } from './register.use-case';
import { InMemoryAuthRepository } from '../../testing/in-memory-auth.repository';
import { InvalidEmailError, InvalidPasswordError, EmailAlreadyInUseError } from '@domain/errors/auth.errors';

describe('RegisterUseCase', () => {
  let sut: RegisterUseCase;
  let repo: InMemoryAuthRepository;

  beforeEach(() => {
    repo = new InMemoryAuthRepository();
    sut  = new RegisterUseCase(repo);
  });

  it('creates a user and returns an AuthSession', async () => {
    const session = await sut.execute({
      email:    'new@example.com',
      password: 'Secret1234',
      fullName: 'María López',
    });

    expect(session.user.email.value).toBe('new@example.com');
    expect(session.user.fullName).toBe('María López');
    expect(session.accessToken).toBeTruthy();
  });

  it('throws InvalidEmailError when the email format is invalid', async () => {
    await expect(
      sut.execute({ email: 'bad-email', password: 'Secret1234', fullName: 'Test' }),
    ).rejects.toThrow(InvalidEmailError);
  });

  it('throws InvalidPasswordError when the password is too weak', async () => {
    await expect(
      sut.execute({ email: 'user@example.com', password: 'weak', fullName: 'Test' }),
    ).rejects.toThrow(InvalidPasswordError);
  });

  it('throws EmailAlreadyInUseError when the email is already registered', async () => {
    await sut.execute({ email: 'taken@example.com', password: 'Secret1234', fullName: 'First' });

    await expect(
      sut.execute({ email: 'taken@example.com', password: 'Secret1234', fullName: 'Second' }),
    ).rejects.toThrow(EmailAlreadyInUseError);
  });
});
