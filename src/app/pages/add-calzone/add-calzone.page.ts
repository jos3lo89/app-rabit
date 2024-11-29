import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-calzone',
  templateUrl: './add-calzone.page.html',
  styleUrls: ['./add-calzone.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddCalzonePage {


  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _uploadImageService = inject(UploadImageService);
  private _rollsService = inject();
  private _toast = inject(ToastService)

  dynamicPrice: number = 0;
  openModal = false;
  fotoRoll: string | null = null;
  addLoading = false
  rolls: RollsDb[] | null = null
  CameraSource = CameraSource;

  form = this._fb.group({
    nombre: this._fb.control('', [Validators.required]),
    descripcion: this._fb.control('', [Validators.required]),
    precio: this._fb.control(5, [Validators.required]),
  });

  constructor() {
    addIcons({ camera, close, image });
  }


  async addRoll() {
    try {
      const { descripcion, nombre, precio } = this.form.value;

      if (!this.fotoRoll) {
        console.log("Insertar un foto");
        return
      };

      if (!descripcion || !nombre || !precio) return;


      this.addLoading = true

      await this._rollsService.addRolls(
        {
          descripcion,
          nombre,
          precio,
        },
        this.fotoRoll
      );

      this._toast.getToast("registrado con exito", "middle", "success")
      this.form.reset()
      this.fotoRoll = null
      this.addLoading = false
    } catch (error) {
      console.log(error);
      this._toast.getToast("Error al registrar", "bottom", "danger")
      this.addLoading = false
    }
  }

  async takeImage(source: CameraSource) {
    this.fotoRoll = await this._uploadImageService.takeImage(source);
    this.closeModal();
  }

  pushRouter(route: string) {
    this._router.navigateByUrl(route);
  }

  updateDynamicPrice(event: any) {
    const selectedPrice = Number(event.detail.value);
    if (!isNaN(selectedPrice)) {
      this.dynamicPrice = selectedPrice;
    }
  }

  closeModal() {
    this.openModal = false;
  }
  openModal2() {
    this.openModal = true;
  }

  quitarFoto() {
    this.fotoRoll = null;
  }


}
