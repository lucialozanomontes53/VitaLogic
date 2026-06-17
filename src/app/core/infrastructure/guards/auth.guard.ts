import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthStore } from '@features/auth/state/auth.store'

export const authGuard: CanActivateFn = async () => {
  const store  = inject(AuthStore)
  const router = inject(Router)

  if (!store.currentUser()) {
    await store.restoreSession()
  }

  return store.currentUser() ? true : router.createUrlTree(['/auth/login'])
}
