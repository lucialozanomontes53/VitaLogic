import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { AUTH_REPOSITORY, IAuthRepository } from '@domain/repositories/auth.repository';
import { FAMILY_PROFILE_REPOSITORY, IFamilyProfileRepository } from '@domain/repositories/family-profile.repository';
import { INGREDIENT_REPOSITORY, IIngredientRepository } from '@domain/repositories/ingredient.repository';
import { SHOPPING_ITEM_REPOSITORY, IShoppingItemRepository } from '@domain/repositories/shopping-item.repository';
import { RECIPE_REPOSITORY, IRecipeRepository } from '@domain/repositories/recipe.repository';

import { SupabaseAuthRepository } from '@infrastructure/repositories/supabase-auth.repository';
import { SupabaseFamilyProfileRepository } from '@infrastructure/repositories/supabase-family-profile.repository';
import { SupabaseIngredientRepository } from '@infrastructure/repositories/supabase-ingredient.repository';
import { SupabaseShoppingItemRepository } from '@infrastructure/repositories/supabase-shopping-item.repository';
import { SupabaseRecipeRepository } from '@infrastructure/repositories/supabase-recipe.repository';

import { LoginUseCase } from '@application/use-cases/auth/login.use-case';
import { RegisterUseCase } from '@application/use-cases/auth/register.use-case';
import { GetCurrentSessionUseCase } from '@application/use-cases/auth/get-current-session.use-case';
import { GetFamilyProfilesUseCase } from '@application/use-cases/family-profiles/get-family-profiles.use-case';
import { CreateFamilyProfileUseCase } from '@application/use-cases/family-profiles/create-family-profile.use-case';
import { DeleteFamilyProfileUseCase } from '@application/use-cases/family-profiles/delete-family-profile.use-case';
import { GetIngredientsUseCase } from '@application/use-cases/ingredients/get-ingredients.use-case';
import { CreateIngredientUseCase } from '@application/use-cases/ingredients/create-ingredient.use-case';
import { DeleteIngredientUseCase } from '@application/use-cases/ingredients/delete-ingredient.use-case';
import { GetShoppingItemsUseCase } from '@application/use-cases/shopping-items/get-shopping-items.use-case';
import { CreateShoppingItemUseCase } from '@application/use-cases/shopping-items/create-shopping-item.use-case';
import { ToggleShoppingItemUseCase } from '@application/use-cases/shopping-items/toggle-shopping-item.use-case';
import { DeleteShoppingItemUseCase } from '@application/use-cases/shopping-items/delete-shopping-item.use-case';
import { GetRecipesUseCase } from '@application/use-cases/recipes/get-recipes.use-case';
import { CreateRecipeUseCase } from '@application/use-cases/recipes/create-recipe.use-case';
import { DeleteRecipeUseCase } from '@application/use-cases/recipes/delete-recipe.use-case';

import { AuthStore } from '@features/auth/state/auth.store';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Repositories
    { provide: AUTH_REPOSITORY,            useClass: SupabaseAuthRepository },
    { provide: FAMILY_PROFILE_REPOSITORY,  useClass: SupabaseFamilyProfileRepository },
    { provide: INGREDIENT_REPOSITORY,      useClass: SupabaseIngredientRepository },
    { provide: SHOPPING_ITEM_REPOSITORY,   useClass: SupabaseShoppingItemRepository },
    { provide: RECIPE_REPOSITORY,          useClass: SupabaseRecipeRepository },

    // Auth use cases
    {
      provide: LoginUseCase,
      useFactory: (r: IAuthRepository) => new LoginUseCase(r),
      deps: [AUTH_REPOSITORY],
    },
    {
      provide: RegisterUseCase,
      useFactory: (r: IAuthRepository) => new RegisterUseCase(r),
      deps: [AUTH_REPOSITORY],
    },
    {
      provide: GetCurrentSessionUseCase,
      useFactory: (r: IAuthRepository) => new GetCurrentSessionUseCase(r),
      deps: [AUTH_REPOSITORY],
    },
    {
      provide: AuthStore,
      useFactory: (l: LoginUseCase, r: RegisterUseCase, g: GetCurrentSessionUseCase) =>
        new AuthStore(l, r, g),
      deps: [LoginUseCase, RegisterUseCase, GetCurrentSessionUseCase],
    },

    // Family profile use cases
    {
      provide: GetFamilyProfilesUseCase,
      useFactory: (r: IFamilyProfileRepository) => new GetFamilyProfilesUseCase(r),
      deps: [FAMILY_PROFILE_REPOSITORY],
    },
    {
      provide: CreateFamilyProfileUseCase,
      useFactory: (r: IFamilyProfileRepository) => new CreateFamilyProfileUseCase(r),
      deps: [FAMILY_PROFILE_REPOSITORY],
    },
    {
      provide: DeleteFamilyProfileUseCase,
      useFactory: (r: IFamilyProfileRepository) => new DeleteFamilyProfileUseCase(r),
      deps: [FAMILY_PROFILE_REPOSITORY],
    },

    // Ingredient use cases
    {
      provide: GetIngredientsUseCase,
      useFactory: (r: IIngredientRepository) => new GetIngredientsUseCase(r),
      deps: [INGREDIENT_REPOSITORY],
    },
    {
      provide: CreateIngredientUseCase,
      useFactory: (r: IIngredientRepository) => new CreateIngredientUseCase(r),
      deps: [INGREDIENT_REPOSITORY],
    },
    {
      provide: DeleteIngredientUseCase,
      useFactory: (r: IIngredientRepository) => new DeleteIngredientUseCase(r),
      deps: [INGREDIENT_REPOSITORY],
    },

    // Shopping item use cases
    {
      provide: GetShoppingItemsUseCase,
      useFactory: (r: IShoppingItemRepository) => new GetShoppingItemsUseCase(r),
      deps: [SHOPPING_ITEM_REPOSITORY],
    },
    {
      provide: CreateShoppingItemUseCase,
      useFactory: (r: IShoppingItemRepository) => new CreateShoppingItemUseCase(r),
      deps: [SHOPPING_ITEM_REPOSITORY],
    },
    {
      provide: ToggleShoppingItemUseCase,
      useFactory: (r: IShoppingItemRepository) => new ToggleShoppingItemUseCase(r),
      deps: [SHOPPING_ITEM_REPOSITORY],
    },
    {
      provide: DeleteShoppingItemUseCase,
      useFactory: (r: IShoppingItemRepository) => new DeleteShoppingItemUseCase(r),
      deps: [SHOPPING_ITEM_REPOSITORY],
    },

    // Recipe use cases
    {
      provide: GetRecipesUseCase,
      useFactory: (r: IRecipeRepository) => new GetRecipesUseCase(r),
      deps: [RECIPE_REPOSITORY],
    },
    {
      provide: CreateRecipeUseCase,
      useFactory: (r: IRecipeRepository) => new CreateRecipeUseCase(r),
      deps: [RECIPE_REPOSITORY],
    },
    {
      provide: DeleteRecipeUseCase,
      useFactory: (r: IRecipeRepository) => new DeleteRecipeUseCase(r),
      deps: [RECIPE_REPOSITORY],
    },
  ],
});
