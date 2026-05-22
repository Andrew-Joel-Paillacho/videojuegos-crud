import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideojuegosService } from '../../services/videojuegosService';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  template: `
    <ion-item>
      <ion-label position="stacked">{{ label }}</ion-label>
      <input 
        type="file" 
        [accept]="acceptTypes"
        (change)="onFileSelected($event)"
        style="margin-top: 8px;"
      />
      <ion-note *ngIf="currentUrl">Archivo actual: {{ currentUrl }}</ion-note>
    </ion-item>
  `
})
export class FileUploadComponent {
  @Input() label: string = 'Archivo';
  @Input() acceptTypes: string = 'image/*'; // o 'audio/*'
  @Input() bucket: string = 'media';
  @Input() currentUrl: string = '';
  @Output() fileUploaded = new EventEmitter<string>();

  constructor(private service: VideojuegosService) {}

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Generar nombre único para el archivo
    const extension = file.name.split('.').pop();
    const nombreUnico = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const ruta = `videojuegos/${nombreUnico}`;

    try {
      const url = await this.service.subirArchivo(this.bucket, ruta, file);
      this.fileUploaded.emit(url);
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  }
}