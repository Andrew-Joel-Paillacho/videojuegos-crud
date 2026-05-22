import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'videojuegos',
    loadComponent: () =>
      import('./pages/videojuegos/videojuegos.page')
        .then(m => m.VideojuegosPage),
        canActivate: [AuthGuard]
  },
  {
    path: 'videojuegos-form',
    loadComponent: () =>
      import('./pages/videojuego-form/videojuego-form.page')
        .then(m => m.VideojuegoFormPage),
        canActivate: [AuthGuard]
  },
  {
    path: 'videojuegos-form/:id',
    loadComponent: () =>
      import('./pages/videojuego-form/videojuego-form.page')
        .then(m => m.VideojuegoFormPage),
        canActivate: [AuthGuard]
  }
];