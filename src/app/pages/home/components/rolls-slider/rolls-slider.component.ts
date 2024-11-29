import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RollsDb } from 'src/app/shared/interfaces/rolls.interface';
import { RollsService } from 'src/app/shared/services/rolls.service';

@Component({
  selector: 'app-rolls-slider',
  templateUrl: './rolls-slider.component.html',
  styleUrls: ['./rolls-slider.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,]
})
export class RollsSliderComponent {
  private _rollsService = inject(RollsService)
  private _route = inject(Router)
  rolls: null | RollsDb[] = null
  constructor() {


    this._rollsService.listingRolls().subscribe({
      next: (data) => {
        this.rolls = data
      }, error: (error) => {
        console.log(error);

      }
    })

  }
  pushRouter(url: string) {
    this._route.navigateByUrl(url)
  }
  pushDetails(id: string) {
    console.log(id);

  }

}
