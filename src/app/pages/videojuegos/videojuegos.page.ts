import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton,
  IonFab, IonFabButton, IonLoading, IonAlert, IonCard, 
  IonCardContent, IonCardHeader, IonCardTitle,
  IonCardSubtitle
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideojuegosService, Videojuego } from '../../services/videojuegosService';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.page.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton,
    IonFab, IonFabButton, IonLoading, IonAlert, 
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCardSubtitle,
    SafeUrlPipe
  ]
})
export class VideojuegosPage implements OnInit {

  videojuegos: Videojuego[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private videojuegosService: VideojuegosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargar();
  }

  ionViewWillEnter() {
    this.cargar();
  }

  async cargar() {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      this.videojuegos = await this.videojuegosService.listar();
      console.log('Videojuegos cargados:', this.videojuegos);
    } catch (error: any) {
      console.error('Error al cargar videojuegos:', error);
      this.errorMessage = 'Error al cargar los videojuegos: ' + error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async eliminar(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este videojuego?')) {
      this.isLoading = true;
      try {
        await this.videojuegosService.eliminar(id);
        await this.cargar();
      } catch (error: any) {
        console.error('Error al eliminar:', error);
        this.errorMessage = 'Error al eliminar el videojuego';
      } finally {
        this.isLoading = false;
      }
    }
  }

  async logout() {
    await this.videojuegosService.logout();
  }
}