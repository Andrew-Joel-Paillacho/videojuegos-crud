import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VideojuegosService } from '../services/videojuegosService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private videojuegosService: VideojuegosService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.videojuegosService.isAuthenticated) {
      return true;
    }
    
    this.router.navigateByUrl('/login');
    return false;
  }
}