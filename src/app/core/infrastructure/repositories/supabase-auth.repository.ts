import { Injectable, inject } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { IAuthRepository, AuthSession } from '@domain/repositories/auth.repository';
import { Email } from '@domain/value-objects/email.value-object';
import { User } from '@domain/entities/user.entity';
import { AuthCredentialsError, EmailAlreadyInUseError } from '@domain/errors/auth.errors';
import { SUPABASE_CLIENT } from '../supabase/supabase.client';

@Injectable()
export class SupabaseAuthRepository implements IAuthRepository {
  private readonly client = inject(SUPABASE_CLIENT);

  async login(email: Email, password: string): Promise<AuthSession> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: email.value,
      password,
    });
    if (error || !data.session) throw new AuthCredentialsError();
    return this.toAuthSession(data.session);
  }

  async register(email: Email, password: string, fullName: string): Promise<AuthSession> {
    const { data, error } = await this.client.auth.signUp({
      email: email.value,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      if (error.code === 'user_already_exists') throw new EmailAlreadyInUseError();
      throw new Error(error.message);
    }
    if (!data.session) throw new Error('Email confirmation required before login');
    return this.toAuthSession(data.session);
  }

  async logout(): Promise<void> {
    await this.client.auth.signOut();
  }

  async getCurrentSession(): Promise<AuthSession | null> {
    const { data } = await this.client.auth.getSession();
    if (!data.session) return null;
    return this.toAuthSession(data.session);
  }

  private toAuthSession(session: Session): AuthSession {
    return {
      user: new User({
        id:        session.user.id,
        email:     Email.create(session.user.email!),
        fullName:  session.user.user_metadata?.['full_name'] ?? '',
        avatarUrl: session.user.user_metadata?.['avatar_url'] ?? null,
      }),
      accessToken: session.access_token,
    };
  }
}
