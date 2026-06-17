import { describe, it, expect } from 'vitest';
import { Password } from './password.value-object';
import { InvalidPasswordError } from '../errors/auth.errors';

describe('Password', () => {
  describe('create', () => {
    it('creates a valid password', () => {
      const password = Password.create('Secret1234');
      expect(password.value).toBe('Secret1234');
    });

    it('throws InvalidPasswordError when shorter than 8 characters', () => {
      expect(() => Password.create('Ab1')).toThrow(InvalidPasswordError);
    });

    it('throws InvalidPasswordError when there is no uppercase letter', () => {
      expect(() => Password.create('secret1234')).toThrow(InvalidPasswordError);
    });

    it('throws InvalidPasswordError when there is no digit', () => {
      expect(() => Password.create('SecretPass')).toThrow(InvalidPasswordError);
    });

    it('throws InvalidPasswordError for an empty string', () => {
      expect(() => Password.create('')).toThrow(InvalidPasswordError);
    });
  });
});
