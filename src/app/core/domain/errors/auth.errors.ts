export class InvalidEmailError extends Error {
  constructor() {
    super('Invalid email format');
    this.name = 'InvalidEmailError';
  }
}

export class InvalidPasswordError extends Error {
  constructor(reason: string) {
    super(`Invalid password: ${reason}`);
    this.name = 'InvalidPasswordError';
  }
}

export class AuthCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
    this.name = 'AuthCredentialsError';
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('Email already in use');
    this.name = 'EmailAlreadyInUseError';
  }
}
