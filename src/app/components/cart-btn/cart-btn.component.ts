import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
@Component({
  selector: 'app-cart-btn',
  templateUrl: './cart-btn.component.html',
  styleUrls: ['./cart-btn.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class CartBtnComponent implements OnInit {
  constructor() {
    addIcons({ cartOutline });
  }

  ngOnInit() {}
}
