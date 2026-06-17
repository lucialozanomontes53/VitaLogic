import { InvalidPasswordError } from '../errors/auth.errors';

export class Password {
  private constructor(readonly value: string) {}

  static create(raw: string): Password {
    if (raw.length < 8) {
      throw new InvalidPasswordError('Must be at least 8 characters');
    }
    if (!/[A-Z]/.test(raw)) {
      throw new InvalidPasswordError('Must contain at least one uppercase letter');
    }
    if (!/[0-9]/.test(raw)) {
      throw new InvalidPasswordError('Must contain at least one digit');
    }
    return new Password(raw);
  }
}
