import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RutaGuardada } from './ruta.model';

@Injectable({ providedIn: 'root' })
export class RutasGuardadasService {
  private readonly KEY = 'rutas_guardadas';
  private esBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.esBrowser = isPlatformBrowser(platformId);
  }

  obtenerTodas(): RutaGuardada[] {
    if (!this.esBrowser) return [];
    try {
      return JSON.parse(localStorage.getItem(this.KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  obtener(id: string): RutaGuardada | undefined {
    return this.obtenerTodas().find(r => r.id === id);
  }

  guardar(ruta: Omit<RutaGuardada, 'fechaGuardado'>): void {
    if (!this.esBrowser) return;
    const rutas = this.obtenerTodas().filter(r => r.id !== ruta.id);
    rutas.unshift({ ...ruta, fechaGuardado: new Date().toISOString() });
    localStorage.setItem(this.KEY, JSON.stringify(rutas));
  }

  eliminar(id: string): void {
    if (!this.esBrowser) return;
    const rutas = this.obtenerTodas().filter(r => r.id !== id);
    localStorage.setItem(this.KEY, JSON.stringify(rutas));
  }

  estaGuardada(id: string): boolean {
    return this.obtenerTodas().some(r => r.id === id);
  }
}