import { Injectable, inject, signal } from '@angular/core'
import { FamilyProfile } from '@domain/entities/family-profile.entity'
import { GetFamilyProfilesUseCase } from '@application/use-cases/family-profiles/get-family-profiles.use-case'
import { CreateFamilyProfileUseCase } from '@application/use-cases/family-profiles/create-family-profile.use-case'
import { DeleteFamilyProfileUseCase } from '@application/use-cases/family-profiles/delete-family-profile.use-case'
import { GetIngredientsUseCase } from '@application/use-cases/ingredients/get-ingredients.use-case'
import { AuthStore } from '@features/auth/state/auth.store'

@Injectable({ providedIn: 'root' })
export class HomeStore {
  private readonly getProfilesUseCase  = inject(GetFamilyProfilesUseCase)
  private readonly createProfileUseCase = inject(CreateFamilyProfileUseCase)
  private readonly deleteProfileUseCase = inject(DeleteFamilyProfileUseCase)
  private readonly getIngredientsUseCase = inject(GetIngredientsUseCase)
  private readonly authStore = inject(AuthStore)

  readonly familyProfiles   = signal<FamilyProfile[]>([])
  readonly ingredientCount  = signal(0)
  readonly loading          = signal(false)
  readonly error            = signal<string | null>(null)

  async load(): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    this.loading.set(true)
    this.error.set(null)
    try {
      const [profiles, ingredients] = await Promise.all([
        this.getProfilesUseCase.execute(userId),
        this.getIngredientsUseCase.execute(userId),
      ])
      this.familyProfiles.set(profiles)
      this.ingredientCount.set(ingredients.length)
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al cargar datos')
    } finally {
      this.loading.set(false)
    }
  }

  async addProfile(name: string): Promise<void> {
    const userId = this.authStore.currentUser()?.id
    if (!userId) return
    try {
      const profile = await this.createProfileUseCase.execute(userId, name)
      this.familyProfiles.update((list) => [...list, profile])
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al añadir miembro')
    }
  }

  async removeProfile(id: string): Promise<void> {
    try {
      await this.deleteProfileUseCase.execute(id)
      this.familyProfiles.update((list) => list.filter((p) => p.id !== id))
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al eliminar miembro')
    }
  }
}
