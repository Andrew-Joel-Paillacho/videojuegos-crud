import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    // Convertir URLs de YouTube y TikTok a formato embed
    let embedUrl = url;
    
    // YouTube
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } 
    // YouTube Shorts
    else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // TikTok
    else if (url.includes('tiktok.com')) {
      // TikTok requiere un formato especial
      embedUrl = url;
    }
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}