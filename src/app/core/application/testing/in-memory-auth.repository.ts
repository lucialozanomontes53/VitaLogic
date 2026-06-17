import { AuthSession, IAuthRepository } from '@domain/repositories/auth.repository';
import { Email } from '@domain/value-objects/email.value-object';
import { User } from '@domain/entities/user.entity';
import { AuthCredentialsError, EmailAlreadyInUseError } from '@domain/errors/auth.errors';

interface StoredUser {
  user: User;
  password: string;
}

export class InMemoryAuthRepository implements IAuthRepository {
  private readonly store = new Map<string, StoredUser>();

  async seedUser(data: { email: string; password: string; fullName: string }): Promise<void> {
    const email = Email.create(data.email);
    const user  = new User({ id: crypto.randomUUID(), email, fullName: data.fullName });
    this.store.set(email.value, { user, password: data.password });
  }

  async login(email: Email, password: string): Promise<AuthSession> {
    const entry = this.store.get(email.value);
    if (!entry || entry.password !== password) throw new AuthCredentialsError();
    return { user: entry.user, accessToken: 'fake-token' };
  }

  async register(email: Email, password: string, fullName: string): Promise<AuthSession> {
    if (this.store.has(email.value)) throw new EmailAlreadyInUseError();
    const user = new User({ id: crypto.randomUUID(), email, fullName });
    this.store.set(email.value, { user, password });
    return { user, accessToken: 'fake-token' };
  }

  async logout(): Promise<void> {}

  async getCurrentSession(): Promise<AuthSession | null> {
    return null;
  }
}
