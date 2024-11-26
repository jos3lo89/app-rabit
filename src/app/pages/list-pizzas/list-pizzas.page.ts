import { Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import { PizzaDb } from 'src/app/shared/interfaces/pizza.interfaces';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-pizzas',
  templateUrl: './list-pizzas.page.html',
  styleUrls: ['./list-pizzas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ListPizzasPage {
  private _pizzasService = inject(PizzaService);
  private _router = inject(Router);

  pizzas: PizzaDb[] | null = null;
  filteredPizzas: PizzaDb[] | null = null;

  constructor() {

    this.getingPizzas();
  }


  getingPizzas() {
    this._pizzasService.listingPizzas().subscribe({
      next: (data) => {
        this.pizzas = data;
        this.filteredPizzas = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pushDetails(id: string) {
    console.log(id);

    // const params: NavigationExtras = {
    //   queryParams: {
    //     id,
    //   },
    // };

    // this._router.navigate(['/pizza-details'], params);
  }

  filterPizzas(event: any) {
    const query = event.detail.value?.toLowerCase() || '';

    if (!query) {
      this.filteredPizzas = this.pizzas;
      return;
    }
    if (!this.pizzas) return;
    this.filteredPizzas = this.pizzas.filter((pizza) =>
      pizza.nombre.toLowerCase().includes(query)
    );
  }
  pushRouter(route: string) {
    this._router.navigateByUrl(route)
  }
}
