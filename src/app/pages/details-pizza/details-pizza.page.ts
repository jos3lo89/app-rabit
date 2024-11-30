import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import {
  CuatroEstaciones,
  PizzaDb,
  TamanosPrecios,
} from 'src/app/shared/interfaces/pizza.interfaces';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  private _toast = inject(ToastService);

  userId: string | null = null;
  params = {
    id: '',
    backUrl: '',
  };
  pizza: PizzaDb | null = null;

  tamanoSeleccionado: Tamaño = 'familiar';
  precioUnitario: number = 0;

  quantity: number = 1; // Cantidad inicial

  opcionesDuo = ['Hawaiana', 'Pepperoni', 'Vegetariana', 'Carnes'];
  opcionesCuatroEstaciones = [
    'Hawaiana',
    'Pepperoni',
    'Vegetariana',
    'Mexicana',
  ];

  // Agregar al carrito
  async addToCart() {
    // Simulación de agregar al carrito
    const cartItem = {
      pizza: this.pizza,
      quantity: this.quantity,
    };

    console.log('Item agregado al carrito:', cartItem);

    this._toast.getToast(
      `${this.pizza?.nombre} agregado al carrito.`,
      'middle',
      'success'
    );
  }

  tipoSeleccionado: string = 'salada';
  masaSeleccionada: string = 'clasica';
  configuracionSeleccionada: string = 'completa';
  onTipoChange(event: any) {
    this.tipoSeleccionado = event.detail.value;
  }
  onMasaChange(event: any) {
    this.masaSeleccionada = event.detail.value;
  }

  onDuoChange(event: any, mitad: 'mitad1' | 'mitad2') {
    if (this.pizza && this.pizza.opciones.duo) {
      this.pizza.opciones.duo[mitad] = event.detail.value;
    }
  }

  onCuartoChange(event: any, cuarto: string) {
    if (this.pizza && this.pizza.opciones.cuatroEstaciones) {
      this.pizza.opciones.cuatroEstaciones[cuarto as keyof CuatroEstaciones] =
        event.detail.value;
    }
  }

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
        // confuguracion de la piza
        this.configuracionSeleccionada = data.tipoPizza;
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

  // Incrementar cantidad
  increaseQuantity() {
    this.quantity++;
  }

  // Disminuir cantidad (mínimo 1)
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
