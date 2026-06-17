import { Injectable, signal } from '@angular/core';
import { User } from '@domain/entities/user.entity';
import { LoginUseCase } from '@application/use-cases/auth/login.use-case';
import { RegisterUseCase } from '@application/use-cases/auth/register.use-case';
import { GetCurrentSessionUseCase } from '@application/use-cases/auth/get-current-session.use-case';
import { LoginDto } from '@application/dtos/login.dto';
import { RegisterDto } from '@application/dtos/register.dto';

@Injectable()
export class AuthStore {
  readonly currentUser = signal<User | null>(null);
  readonly loading     = signal(false);
  readonly error       = signal<string | null>(null);

  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly getSessionUseCase: GetCurrentSessionUseCase,
  ) {}

  async restoreSession(): Promise<void> {
    try {
      const session = await this.getSessionUseCase.execute();
      if (session) this.currentUser.set(session.user);
    } catch {
      // no persisted session — stay logged out
    }
  }

  async login(dto: LoginDto): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const session = await this.loginUseCase.execute(dto);
      this.currentUser.set(session.user);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }

  async register(dto: RegisterDto): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const session = await this.registerUseCase.execute(dto);
      this.currentUser.set(session.user);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      this.loading.set(false);
    }
  }

  logout(): void {
    this.currentUser.set(null);
    this.error.set(null);
  }
}
