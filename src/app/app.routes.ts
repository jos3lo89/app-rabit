import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes/auth.routes'),
  },
  {
    path: 'private',
    loadChildren: () => import('./routes/private.routes'),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'list-rolls',
    loadComponent: () =>
      import('./pages/list-rolls/list-rolls.page').then((m) => m.ListRollsPage),
  },
  {
    path: 'list-pizzas',
    loadComponent: () =>
      import('./pages/list-pizzas/list-pizzas.page').then(
        (m) => m.ListPizzasPage
      ),
  },
  {
    path: 'list-drinks',
    loadComponent: () =>
      import('./pages/list-drinks/list-drinks.page').then(
        (m) => m.ListDrinksPage
      ),
  },
  {
    path: 'list-calzone',
    loadComponent: () =>
      import('./pages/list-calzone/list-calzone.page').then(
        (m) => m.ListCalzonePage
      ),
  },
  {
    path: 'list-extras',
    loadComponent: () =>
      import('./pages/list-extras/list-extras.page').then(
        (m) => m.ListExtrasPage
      ),
  },
  {
    path: 'details-pizza',
    loadComponent: () =>
      import('./pages/details-pizza/details-pizza.page').then(
        (m) => m.DetailsPizzaPage
      ),
  },
  {
    path: 'details-drink',
    loadComponent: () =>
      import('./pages/details-drink/details-drink.page').then(
        (m) => m.DetailsDrinkPage
      ),
  },
  {
    path: 'details-rolls',
    loadComponent: () =>
      import('./pages/details-rolls/details-rolls.page').then(
        (m) => m.DetailsRollsPage
      ),
  },
  {
    path: 'details-calzone',
    loadComponent: () =>
      import('./pages/details-calzone/details-calzone.page').then(
        (m) => m.DetailsCalzonePage
      ),
  },
  {
    path: 'details-extras',
    loadComponent: () =>
      import('./pages/details-extras/details-extras.page').then(
        (m) => m.DetailsExtrasPage
      ),
  },
];
