export interface RecipeMacros {
  proteinsG: number
  carbsG: number
  vegetablesG: number
}

export class Recipe {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    readonly cookedForId: string | null,
    readonly cookedForName: string,
    readonly macros: RecipeMacros,
    readonly cookedAt: Date,
    readonly createdAt: Date,
  ) {}
}
