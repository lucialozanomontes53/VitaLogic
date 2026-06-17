import { InjectionToken } from '@angular/core';
import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.value-object';

export interface AuthSession {
  user: User;
  accessToken: string;
}

export interface IAuthRepository {
  login(email: Email, password: string): Promise<AuthSession>;
  register(email: Email, password: string, fullName: string): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentSession(): Promise<AuthSession | null>;
}

export const AUTH_REPOSITORY = new InjectionToken<IAuthRepository>('AUTH_REPOSITORY');
