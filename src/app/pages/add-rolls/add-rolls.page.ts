import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraSource } from '@capacitor/camera';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import { addIcons } from 'ionicons';
import { camera, close, image } from 'ionicons/icons';
import { RollsService } from 'src/app/shared/services/rolls.service';

@Component({
  selector: 'app-add-rolls',
  templateUrl: './add-rolls.page.html',
  styleUrls: ['./add-rolls.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class AddRollsPage implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _uploadImageService = inject(UploadImageService);
  private _rollsService = inject(RollsService);

  dynamicPrice: number = 0;
  openModal = false;
  fotoRoll: string | null = null;

  CameraSource = CameraSource;

  form = this._fb.group({
    nombre: this._fb.control('', [Validators.required]),
    descripcion: this._fb.control('', [Validators.required]),
    precio: this._fb.control(5, [Validators.required]),
  });

  constructor() {
    addIcons({ camera, close, image });
  }

  ngOnInit() {}

  async addRoll() {
    try {
      const { descripcion, nombre, precio } = this.form.value;

      if (!this.fotoRoll) return;
      if (!descripcion || !nombre || !precio) return;

      this._rollsService.addRolls(
        {
          descripcion,
          nombre,
          precio,
        },
        this.fotoRoll
      );
    } catch (error) {
      console.log(error);
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
