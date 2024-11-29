import { Component, inject, } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular"
import { CalzoneDB } from 'src/app/shared/interfaces/calzone.interfaces';
import { CalzoneService } from 'src/app/shared/services/calzone.service';

@Component({
  selector: 'app-calsone-slider',
  templateUrl: './calsone-slider.component.html',
  styleUrls: ['./calsone-slider.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class CalsoneSliderComponent {
  private _calzoneService = inject(CalzoneService)
  private _router = inject(Router)

  calzones: null | CalzoneDB[] = null
  constructor() {

    this._calzoneService.getingCalzone().subscribe({
      next: (data) => {
        this.calzones = data
      },
      error: (error) => {
        console.log(error);

      }
    })

  }

  pushRouter(url: string) {
    this._router.navigateByUrl(url)
  }


  pushDetails(id: string) {
    console.log(id);

  }

}
