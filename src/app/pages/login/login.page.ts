import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideojuegosService } from '../../services/videojuegosService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent
  ]
})
export class LoginPage {
  email = '';
  password = '';
  mensaje = '';

  constructor(
    private videojuegosService: VideojuegosService,
    private router: Router
  ) {
    // Si ya está autenticado, redirigir
    if (this.videojuegosService.isAuthenticated) {
      this.router.navigateByUrl('/videojuegos');
    }
  }

  async login() {
    const { error } = await this.videojuegosService.login(
      this.email,
      this.password
    );

    if (error) {
      this.mensaje = error.message;
      return;
    }

    this.router.navigateByUrl('/videojuegos');
  }

  async register() {
    const { error } = await this.videojuegosService.register(
      this.email,
      this.password
    );

    if (error) {
      this.mensaje = error.message;
      return;
    }

    this.mensaje = 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.';
    // Limpiar campos después de registro
    this.password = '';
  }
}