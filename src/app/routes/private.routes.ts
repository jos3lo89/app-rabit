import { Routes } from "@angular/router";

export default [
  {
    path: 'add-pizza',
    loadComponent: () => import('../pages/add-pizza/add-pizza.page').then(m => m.AddPizzaPage)
  },
  {
    path: 'add-drink',
    loadComponent: () => import('../pages/add-drink/add-drink.page').then(m => m.AddDrinkPage)
  },
  {
    path: "add-rolls",
    loadComponent: () => import('../pages/add-rolls/add-rolls.page').then(m => m.AddRollsPage)
  },
  {
    path: 'add-calzone',
    loadComponent: () => import('../pages/add-calzone/add-calzone.page').then(m => m.AddCalzonePage)
  },
] as Routes
