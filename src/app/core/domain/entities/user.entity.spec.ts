import { describe, it, expect } from 'vitest';
import { User } from './user.entity';
import { Email } from '../value-objects/email.value-object';

describe('User', () => {
  const email = Email.create('user@example.com');

  it('creates a user with the provided properties', () => {
    const user = new User({ id: 'uuid-1', email, fullName: 'Ana García' });

    expect(user.id).toBe('uuid-1');
    expect(user.email.value).toBe('user@example.com');
    expect(user.fullName).toBe('Ana García');
  });

  it('sets avatarUrl to null when not provided', () => {
    const user = new User({ id: 'uuid-1', email, fullName: 'Ana García' });
    expect(user.avatarUrl).toBeNull();
  });

  it('stores the provided avatarUrl', () => {
    const user = new User({ id: 'uuid-1', email, fullName: 'Ana García', avatarUrl: 'https://example.com/avatar.png' });
    expect(user.avatarUrl).toBe('https://example.com/avatar.png');
  });
});
