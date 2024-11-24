import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CartBtnComponent } from '../cart-btn/cart-btn.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CartBtnComponent],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
