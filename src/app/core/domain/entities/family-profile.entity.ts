export class FamilyProfile {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    readonly createdAt: Date,
  ) {}
}
