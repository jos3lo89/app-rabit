import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import { PizzaDb } from 'src/app/shared/interfaces/pizza.interfaces';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

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
  private _cartService = inject(CartService);
  private _loadingService = inject(LoadingService);
  params = {
    id: '',
    backUrl: '',
  };

  opcionesDuo = ['Hawaiana', 'Pepperoni', 'Vegetariana', 'Carnes'];
  opcionesCuatroEstaciones = [
    'Hawaiana',
    'Pepperoni',
    'Vegetariana',
    'Mexicana',
  ];

  pizza: PizzaDb | null = null;
  userId: string | null = null;
  tamanoSeleccionado: string = 'familiar';
  precioUnitario: number = 0;
  precioTotal: number = this.precioUnitario;
  quantity: number = 1;
  tipoSeleccionado: string = 'salada';
  masaSeleccionada: string = 'clasica';
  addToCartLoading = false;

  onTipoChange(event: any) {
    console.log(event.detail.value);
    this.tipoSeleccionado = event.detail.value;
  }

  onMasaChange(event: any) {
    console.log(event.detail.value);
    this.masaSeleccionada = event.detail.value;
  }

  onTamanoChange(event: any) {
    console.log(event.detail.value);
    this.tamanoSeleccionado = event.detail.value;

    this.tamanoSeleccionado = event.detail.value;

    if (this.tamanoSeleccionado === 'familiar' && this.pizza) {
      this.precioUnitario = this.pizza.tamanosPrecios.familiar;
    }
    if (this.tamanoSeleccionado === 'mediana' && this.pizza) {
      this.precioUnitario = this.pizza.tamanosPrecios.mediana;
    }
    if (this.tamanoSeleccionado === 'personal' && this.pizza) {
      this.precioUnitario = this.pizza.tamanosPrecios.personal;
    }

    this.onPriceChange();
  }

  onPriceChange() {
    if (this.precioUnitario !== null) {
      this.precioTotal = this.precioUnitario * this.quantity;
    }
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
      this.onPriceChange();
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.onPriceChange();
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
        this.precioUnitario = this.pizza.tamanosPrecios.familiar;
        this.onPriceChange();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  pushRouter() {
    this._router.navigateByUrl(`/${this.params.backUrl}`);
  }

  async addToCart() {
    if (!this.userId) {
      this._toast.getToast(
        'Iniciar sesion para agregar al carrito',
        'middle',
        'warning'
      );

      return;
    }
    if (!this.pizza) return;

    const loading = await this._loadingService.loading();
    await loading.present();

    try {
      this.addToCartLoading = true;

      const result = await this._cartService.addToCart({
        cantidad: this.quantity,
        idItem: this.pizza.id,
        descuento: parseFloat(this.pizza.descuento),
        idUser: this.userId,
        imagen: this.pizza.image,
        nombre: this.pizza.nombre,
        precioTotal: this.precioTotal,
        precioUnidad: this.precioUnitario,
        pizzaDetail: {
          esCuatroEstaciones: this.pizza.opciones.esCuatroEstaciones,
          esDuo: this.pizza.opciones.esDuo,
          esEntero: this.pizza.opciones.esEntero,
          masa: this.masaSeleccionada,
          tamano: this.tamanoSeleccionado,
          sabor: this.tipoSeleccionado,
        },
      });

      if (!result) {
        this._toast.getToast('Error al añadir null', 'middle', 'warning');
      }

      this._toast.getToast('Pizza agregado al carrito', 'middle', 'success');

      this.addToCartLoading = false;
    } catch (error) {
      this.addToCartLoading = false;
      console.log(error);
      this._toast.getToast('Error al añadir', 'middle', 'warning');
    } finally {
      loading.dismiss();
    }
  }
}
