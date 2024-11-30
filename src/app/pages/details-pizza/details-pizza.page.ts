import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import {
  PizzaDb,
  TamanosPrecios,
} from 'src/app/shared/interfaces/pizza.interfaces';

type Tamaño = keyof TamanosPrecios; // 'familiar' | 'mediana' | 'personal'

@Component({
  selector: 'app-details-pizza',
  templateUrl: './details-pizza.page.html',
  styleUrls: ['./details-pizza.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetailsPizzaPage implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _pizzaService = inject(PizzaService);
  private _router = inject(Router);

  userId: string | null = null;
  params = {
    id: '',
    backUrl: '',
  };
  pizza: PizzaDb | null = null;

  tamanoSeleccionado: Tamaño = 'familiar';
  precioUnitario: number = 0;

  constructor() {
    this._activatedRoute.queryParams.subscribe((param) => {
      if (param['id']) {
        this.params.id = param['id'];
        this.params.backUrl = param['backUrl'];
      }
    });

    this._authService.authState$.subscribe({
      next: (data) => {
        if (data) {
          this.userId = data.uid;
        }
      },
    });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this._pizzaService.gettingPizzaWithId(this.params.id).subscribe({
      next: (data) => {
        console.log(data);
        this.pizza = data;
        this.actualizarPrecio();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  actualizarPrecio() {
    if (this.pizza) {
      const precioUnitario = this.pizza.tamanosPrecios[this.tamanoSeleccionado];
      if (precioUnitario !== undefined) {
        this.precioUnitario = precioUnitario;
      } else {
        console.error('El tamaño seleccionado no es válido.');
      }
    }
  }

  onTamanoChange(event: any) {
    this.tamanoSeleccionado = event.detail.value as Tamaño;
    this.actualizarPrecio();
  }

  pushRouter() {
    this._router.navigateByUrl(`/${this.params.backUrl}`);
  }
}
