import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DrinkDb } from 'src/app/shared/interfaces/drink.interfaces';
import { DrinkService } from 'src/app/shared/services/drink.service';
@Component({
  selector: 'app-drinks-slider',
  templateUrl: './drinks-slider.component.html',
  styleUrls: ['./drinks-slider.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DrinksSliderComponent implements OnInit {
  private _drinkservice = inject(DrinkService);
  private _router = inject(Router);

  drinks: DrinkDb[] | null = null;

  constructor() {}

  ngOnInit() {
    this.getingPizzas();
  }

  getingPizzas() {
    this._drinkservice.listingDrinks().subscribe({
      next: (data) => {
        // const newData = data.map((p, i) => {
        //   return i < 2 && p;
        // });

        this.drinks = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  pushRouter(router: string) {
    this._router.navigateByUrl(router);
  }

  pushDetails(id: string) {
    console.log(id);
  }
}