import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUseCase } from './login.use-case';
import { InMemoryAuthRepository } from '../../testing/in-memory-auth.repository';
import { AuthCredentialsError } from '@domain/errors/auth.errors';
import { InvalidEmailError } from '@domain/errors/auth.errors';

describe('LoginUseCase', () => {
  let sut: LoginUseCase;
  let repo: InMemoryAuthRepository;

  beforeEach(async () => {
    repo = new InMemoryAuthRepository();
    sut  = new LoginUseCase(repo);

    await repo.seedUser({
      email:    'user@example.com',
      password: 'Secret1234',
      fullName: 'Ana García',
    });
  });

  it('returns an AuthSession when credentials are correct', async () => {
    const session = await sut.execute({ email: 'user@example.com', password: 'Secret1234' });

    expect(session.user.email.value).toBe('user@example.com');
    expect(session.accessToken).toBeTruthy();
  });

  it('throws AuthCredentialsError when the password is wrong', async () => {
    await expect(
      sut.execute({ email: 'user@example.com', password: 'WrongPass1' }),
    ).rejects.toThrow(AuthCredentialsError);
  });

  it('throws AuthCredentialsError when the user does not exist', async () => {
    await expect(
      sut.execute({ email: 'ghost@example.com', password: 'Secret1234' }),
    ).rejects.toThrow(AuthCredentialsError);
  });

  it('throws InvalidEmailError when the email format is invalid', async () => {
    await expect(
      sut.execute({ email: 'not-an-email', password: 'Secret1234' }),
    ).rejects.toThrow(InvalidEmailError);
  });
});
