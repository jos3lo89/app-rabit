import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { GoogleBtnComponent } from '../../components/google-btn/google-btn.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleBtnComponent,
  ],
})
export default class LoginPage implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  constructor() {}

  isLoadingBtnSubmit = false;
  isLoadingGoogleBtn = false;

  ngOnInit() {}

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  async ingresar() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    if (!email || !password) return;

    try {
      this.isLoadingBtnSubmit = true;

      const user = await this._authService.login({
        email,
        password,
      });

      this._router.navigateByUrl('/pages/home');
      this.isLoadingBtnSubmit = false;
      this._toast.getToast(
        `Vienvenido ${
          user.user.displayName ? user.user.displayName : user.user.email
        }`,
        'middle',
        'success'
      );
      this.form.reset();
    } catch (error) {
      console.log(error);
      this._toast.getToast('Error al iniciar sesión', 'middle', 'danger');
      this.isLoadingBtnSubmit = false;
    }
  }

  async loginWithGoogle() {
    try {
      this.isLoadingGoogleBtn = true;
      const user = await this._authService.loginWithGoogle();
      this._router.navigateByUrl('/home');
      this._toast.getToast(
        `Vienvenido ${
          user.user.displayName ? user.user.displayName : user.user.email
        }`,
        'middle',
        'success'
      );
      this.isLoadingGoogleBtn = false;
    } catch (error) {
      this._toast.getToast('Error al iniciar sesión', 'middle', 'danger');
      console.log(error);
      this.isLoadingGoogleBtn = false;
    }
  }
}