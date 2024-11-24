import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ToggleThemeComponent } from '../toggle-theme/toggle-theme.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  personSharp,
  homeOutline,
  homeSharp,
} from 'ionicons/icons';
@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, ToggleThemeComponent, RouterLink, RouterLinkActive],
})
export class AsideBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    addIcons({
      homeOutline,
      homeSharp,
      personOutline,
      personSharp,
    });
  }
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
  ];
}
