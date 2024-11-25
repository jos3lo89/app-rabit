import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, close, image } from 'ionicons/icons';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import {
  CuatroEstaciones,
  Duo,
  Pizza,
  TamanosPrecios,
} from 'src/app/shared/interfaces/pizza.interfaces';
import { fb } from './utils/pizzaForm';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.page.html',
  styleUrls: ['./add-pizza.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class AddPizzaPage implements OnInit {
  ngOnInit(): void {}

  private _router = inject(Router);
  private _toast = inject(ToastService);
  private _uploadImageService = inject(UploadImageService);
  private _pizzaService = inject(PizzaService);

  fotoPizza: string | null = null;
  openModal = false;
  CameraSource = CameraSource;
  guardando = false;
  form = fb();

  constructor() {
    addIcons({ camera, image, close });
  }

  async guardarPizza() {
    // if (this.form.invalid) {
    //   console.log('Formulario inválido:', this.form.errors);
    //   this._toast.getToast(
    //     'Por favor, complete todos los campos requeridos.',
    //     'middle',
    //     'danger'
    //   );
    //   return;
    // }

    if (!this.fotoPizza) {
      console.log('No se ha seleccionado una imagen para la pizza.');
      this._toast.getToast(
        'Debe añadir una foto de la pizza.',
        'middle',
        'danger'
      );
      return;
    }

    const tipoPizza = this.form.get('tipoPizza')?.value;
    if (tipoPizza === 'duo') {
      const duo = this.form.get('duo')?.value as Duo;
      if (!duo?.mitad1 || !duo?.mitad2) {
        console.log('Faltan sabores para la pizza dúo:', duo);
        this._toast.getToast(
          'Debe especificar ambos sabores para la pizza dúo.',
          'middle',
          'danger'
        );
        return;
      }
    } else if (tipoPizza === 'cuatro-estaciones') {
      const cuatroEstaciones = this.form.get('cuatroEstaciones')
        ?.value as CuatroEstaciones;
      if (
        !cuatroEstaciones?.cuarto1 ||
        !cuatroEstaciones?.cuarto2 ||
        !cuatroEstaciones?.cuarto3 ||
        !cuatroEstaciones?.cuarto4
      ) {
        console.log(
          'Faltan sabores para la pizza cuatro estaciones:',
          cuatroEstaciones
        );
        this._toast.getToast(
          'Debe especificar los cuatro sabores para la pizza Cuatro Estaciones.',
          'middle',
          'danger'
        );
        return;
      }
    }

    const tamanosPrecios = this.form.get('tamanosPrecios')
      ?.value as TamanosPrecios;
    if (
      !tamanosPrecios?.familiar ||
      !tamanosPrecios?.mediana ||
      !tamanosPrecios?.personal
    ) {
      console.log('Faltan precios para los tamaños:', tamanosPrecios);
      this._toast.getToast(
        'Debe especificar los precios para todos los tamaños.',
        'middle',
        'danger'
      );
      return;
    }

    this.guardando = true;
    try {
      const pizza: Pizza = this.form.value as Pizza;
      const resultado = await this._pizzaService.uploadPizza(
        pizza,
        this.fotoPizza
      );
      if (resultado) {
        // console.log('Pizza guardada exitosamente:', resultado);
        this._toast.getToast('Pizza guardada con éxito.', 'middle', 'success');
        // this.pushRouter('/pizzas'); // Redirigir a otra página tras guardar
        this.form.reset();
        this.fotoPizza = null;
      } else {
        console.log('Error al guardar la pizza.');
        this._toast.getToast(
          'No se pudo guardar la pizza. Intente nuevamente.',
          'middle',
          'danger'
        );
      }
    } catch (error) {
      console.log('Error inesperado al guardar la pizza:', error);
      this._toast.getToast(
        'Ocurrió un error inesperado al guardar la pizza.',
        'middle',
        'danger'
      );
    } finally {
      this.guardando = false;
    }
  }

  pushRouter(route: string) {
    this._router.navigateByUrl(route);
  }

  get tipoPizza() {
    return this.form.get('tipoPizza')?.value;
  }

  async takeImage(source: CameraSource) {
    this.fotoPizza = await this._uploadImageService.takeImage(source);
    this.closeModal();
  }

  onTipoPizzaChange() {
    const tipoPizza = this.form.get('tipoPizza')?.value;

    if (tipoPizza === 'duo') {
      this.form.get('cuatroEstaciones')?.reset();
    } else if (tipoPizza === 'cuatro-estaciones') {
      this.form.get('duo')?.reset();
    } else {
      this.form.get('duo')?.reset();
      this.form.get('cuatroEstaciones')?.reset();
    }
  }

  closeModal() {
    this.openModal = false;
  }
  openModal2() {
    this.openModal = true;
  }
}
