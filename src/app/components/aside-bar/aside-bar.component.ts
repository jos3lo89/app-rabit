import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ToggleThemeComponent } from '../toggle-theme/toggle-theme.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  personSharp,
  homeOutline,
  homeSharp,
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
} from 'ionicons/icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '@angular/fire/auth';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, ToggleThemeComponent, RouterLink, RouterLinkActive],
})
export class AsideBarComponent implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toast = inject(ToastService);
  user: User | null = null;

  appPages = [{ title: 'Inicio', url: '/home', icon: 'home', isAuth: false }];

  constructor() {
    addIcons({
      homeOutline,
      homeSharp,
      personOutline,
      personSharp,
      logInOutline,
      logInSharp,
      logOutOutline,
      logOutSharp,
    });
  }

  ngOnInit() {
    this._authService.authState$.subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
