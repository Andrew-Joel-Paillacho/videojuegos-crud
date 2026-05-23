import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideojuegosService, Videojuego } from '../../services/videojuegosService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videojuego-form',
  templateUrl: './videojuego-form.page.html',
  standalone: true,
  styleUrl: './videojuego-form.page.scss',
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    CommonModule
  ]
})
export class VideojuegoFormPage implements OnInit {

  id?: number;

  videojuego: Videojuego = {
    titulo: '',
    plataforma: '',
    precio: 0,
    stock: 0,
    categoria: '',
    imagen_url: '',
    audio_url: '',    // AÑADE ESTO
    video_url: ''     // AÑADE ESTO (si ya lo tenías)
  };

  // Estas son las nuevas variables para manejar los archivos
  imagenPreview: string | null = null;
  archivoImagen: File | null = null;
  archivoAudio: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videojuegosService: VideojuegosService
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);
      this.videojuego = await this.videojuegosService.obtenerPorId(this.id);
    }
  }

  // MÉTODO PARA CUANDO SELECCIONAN UNA IMAGEN
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoImagen = file;
      // Crear preview local para que el usuario vea la imagen antes de guardar
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // MÉTODO PARA CUANDO SELECCIONAN UN AUDIO
  onAudioSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoAudio = file;
    }
  }

  // MÉTODO PARA ELIMINAR LA IMAGEN
  eliminarImagen() {
    this.videojuego.imagen_url = '';
    this.imagenPreview = null;
    this.archivoImagen = null;
  }

  // MÉTODO PARA ELIMINAR EL AUDIO
  eliminarAudio() {
    this.videojuego.audio_url = '';
    this.archivoAudio = null;
  }

  async guardar() {
    // Subir imagen si se seleccionó una nueva
    if (this.archivoImagen) {
      const extension = this.archivoImagen.name.split('.').pop();
      const rutaImagen = `videojuegos/img-${Date.now()}.${extension}`;
      this.videojuego.imagen_url = await this.videojuegosService.subirArchivo(
        'media', 
        rutaImagen, 
        this.archivoImagen
      );
    }
    
    // Subir audio si se seleccionó uno nuevo
    if (this.archivoAudio) {
      const extension = this.archivoAudio.name.split('.').pop();
      const rutaAudio = `videojuegos/audio-${Date.now()}.${extension}`;
      this.videojuego.audio_url = await this.videojuegosService.subirArchivo(
        'media', 
        rutaAudio, 
        this.archivoAudio
      );
    }
    
    // Guardar en la base de datos
    if (this.id) {
      await this.videojuegosService.actualizar(this.id, this.videojuego);
    } else {
      await this.videojuegosService.crear(this.videojuego);
    }

    this.router.navigate(['/videojuegos']);
  }

  cancelar() {
    this.router.navigate(['/videojuegos']);
  }

}