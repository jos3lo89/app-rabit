import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PizzaDb } from 'src/app/shared/interfaces/pizza.interfaces';
import { PizzasSliderComponent } from './components/pizzas-slider/pizzas-slider.component';
import { DrinksSliderComponent } from './components/drinks-slider/drinks-slider.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    PizzasSliderComponent,
    DrinksSliderComponent,
  ],
})
export class HomePage {
  private _router = inject(Router);
  pizzas: PizzaDb[] | null = null;

  constructor() { }


  pushRouter(route: string) {
    this._router.navigateByUrl(route);
  }
}
