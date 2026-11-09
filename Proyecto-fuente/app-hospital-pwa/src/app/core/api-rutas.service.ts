import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRutasService {
  // Asegúrate de que el puerto coincida con tu backend (ej. 3000 o el que usen)
  private apiUrl = 'http://127.0.0.1:3000/api/rutas/calcular';

  constructor(private http: HttpClient) { }

  getCalculoRuta(origenId: number, destinoId: number, necesitaAccesibilidad: boolean): Observable<any> {
    const url = `${this.apiUrl}?origen=${origenId}&destino=${destinoId}&accesible=${necesitaAccesibilidad}`;
    return this.http.get(url);
  }
}