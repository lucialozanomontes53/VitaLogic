import { Email } from '../value-objects/email.value-object';

interface UserProps {
  id: string;
  email: Email;
  fullName: string;
  avatarUrl?: string | null;
}

export class User {
  readonly id: string;
  readonly email: Email;
  readonly fullName: string;
  readonly avatarUrl: string | null;

  constructor(props: UserProps) {
    this.id        = props.id;
    this.email     = props.email;
    this.fullName  = props.fullName;
    this.avatarUrl = props.avatarUrl ?? null;
  }
}
