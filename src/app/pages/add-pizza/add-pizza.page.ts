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
    try {
      if (!this.form.valid) {
        this._toast.getToast('Corrija el formulario', 'top', 'warning');
        return;
      }

      if (!this.fotoPizza) {
        this._toast.getToast('Agregue una foto', 'top', 'warning');
        return;
      }

      this.guardando = true;

      console.log(this.form.value);

      await this._pizzaService.uploadPizza(this.form.value, this.fotoPizza);

      this.form.reset();
      this.fotoPizza = null;
      this._toast.getToast('Pizza registrado', 'middle', 'success');
      this.guardando = false;
    } catch (error) {
      console.log(error);
      this._toast.getToast('No se pudo registrar la pizza', 'middle', 'danger');
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
