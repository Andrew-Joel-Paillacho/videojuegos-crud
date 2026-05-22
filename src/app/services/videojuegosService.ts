import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export interface Videojuego {
  id?: number;
  titulo: string;
  plataforma: string;
  precio: number;
  stock: number;
  categoria?: string;
  imagen_url?: string;
  video_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
  private supabase: SupabaseClient;
  private _currentUser: User | null = null;

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    
    // Verificar sesión al iniciar
    this.checkSession();
  }

  // ========== MÉTODOS DE AUTENTICACIÓN ==========
  
  async checkSession() {
    const { data: { session } } = await this.supabase.auth.getSession();
    this._currentUser = session?.user || null;
    
    // Escuchar cambios en la autenticación
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._currentUser = session?.user || null;
    });
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  get isAuthenticated(): boolean {
    return this._currentUser !== null;
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (!error && data.user) {
      this._currentUser = data.user;
    }
    
    return { data, error };
  }

  async register(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });
    
    return { data, error };
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (!error) {
      this._currentUser = null;
      this.router.navigateByUrl('/login');
    }
    return { error };
  }

  // ========== MÉTODOS DE VIDEOJUEGOS ==========

  async listar() {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data as Videojuego[];
  }

  async obtenerPorId(id: number) {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Videojuego;
  }

  async crear(videojuego: Videojuego) {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .insert(videojuego)
      .select();

    if (error) throw error;
    return data;
  }

  async actualizar(id: number, videojuego: Videojuego) {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .update(videojuego)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async eliminar(id: number) {
    const { error } = await this.supabase
      .from('videojuegos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}