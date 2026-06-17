import { Routes } from '@angular/router';
import { authGuard } from './core/infrastructure/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'history',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/recipe-history/pages/history-list/history-list.page').then(
        (m) => m.HistoryListPage,
      ),
  },
  {
    path: 'fridge',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/fridge/pages/fridge/fridge.page').then((m) => m.FridgePage),
  },
  {
    path: 'shopping-list',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/shopping-list/pages/shopping-list/shopping-list.page').then(
        (m) => m.ShoppingListPage,
      ),
  },
];
