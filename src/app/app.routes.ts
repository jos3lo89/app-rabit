import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes/auth.routes'),
  },
  {
    path: 'add-pizza',
    loadComponent: () => import('./pages/add-pizza/add-pizza.page').then(m => m.AddPizzaPage)
  },
  {
    path: 'add-drink',
    loadComponent: () => import('./pages/add-drink/add-drink.page').then(m => m.AddDrinkPage)
  },
  {
    path: 'list-pizzas',
    loadComponent: () => import('./pages/list-pizzas/list-pizzas.page').then(m => m.ListPizzasPage)
  },
  {
    path: 'list-drinks',
    loadComponent: () => import('./pages/list-drinks/list-drinks.page').then(m => m.ListDrinksPage)
  },  {
    path: 'add-rolls',
    loadComponent: () => import('./pages/add-rolls/add-rolls.page').then( m => m.AddRollsPage)
  },


];
