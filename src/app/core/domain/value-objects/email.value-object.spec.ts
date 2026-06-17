import { describe, it, expect } from 'vitest';
import { Email } from './email.value-object';
import { InvalidEmailError } from '../errors/auth.errors';

describe('Email', () => {
  describe('create', () => {
    it('creates a valid email', () => {
      const email = Email.create('user@example.com');
      expect(email.value).toBe('user@example.com');
    });

    it('normalizes the address to lowercase', () => {
      const email = Email.create('User@EXAMPLE.COM');
      expect(email.value).toBe('user@example.com');
    });

    it('throws InvalidEmailError for an address without @', () => {
      expect(() => Email.create('notanemail')).toThrow(InvalidEmailError);
    });

    it('throws InvalidEmailError for an empty string', () => {
      expect(() => Email.create('')).toThrow(InvalidEmailError);
    });

    it('throws InvalidEmailError when the domain is missing', () => {
      expect(() => Email.create('user@')).toThrow(InvalidEmailError);
    });

    it('throws InvalidEmailError when the local part is missing', () => {
      expect(() => Email.create('@example.com')).toThrow(InvalidEmailError);
    });
  });

  describe('equals', () => {
    it('returns true for two emails with the same address', () => {
      const a = Email.create('user@example.com');
      const b = Email.create('USER@EXAMPLE.COM');
      expect(a.equals(b)).toBe(true);
    });

    it('returns false for two different addresses', () => {
      const a = Email.create('a@example.com');
      const b = Email.create('b@example.com');
      expect(a.equals(b)).toBe(false);
    });
  });
});
