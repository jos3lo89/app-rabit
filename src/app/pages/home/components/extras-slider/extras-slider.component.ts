import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExtrasDb } from 'src/app/shared/interfaces/extras.interfaces';
import { ExtrasService } from 'src/app/shared/services/extras.service';

@Component({
  selector: 'app-extras-slider',
  templateUrl: './extras-slider.component.html',
  styleUrls: ['./extras-slider.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ExtrasSliderComponent {
  private _extrasService = inject(ExtrasService);
  private _router = inject(Router);
  isContentVisible = true;

  toggleVisibility() {
    this.isContentVisible = !this.isContentVisible;
  }

  extras: ExtrasDb[] | null = null;

  constructor() {
    this.getingPizzas();
  }

  // ngOnInit() {
  // }

  getingPizzas() {
    this._extrasService.listingExtras().subscribe({
      next: (data) => {
        // const newData = data.map((p, i) => {
        //   return i < 2 && p;
        // });

        this.extras = data;
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
    this._router.navigate(['/details-extras'], {
      queryParams: {
        id,
        backUrl: 'home',
      },
    });
  }
}
