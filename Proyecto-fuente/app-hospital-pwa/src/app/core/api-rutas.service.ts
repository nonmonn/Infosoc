import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRutasService {
  // Apunta al endpoint real del backend: /api/recorridos
  private apiUrl = 'http://localhost:3000/api/recorridos';

  constructor(private http: HttpClient) { }

  // Cambiamos origenId y destinoId a string para usar códigos como 'entrada_prin' y 'bano_1'
  getCalculoRuta(origenId: string, destinoId: string, necesitaAccesibilidad: boolean = false): Observable<any> {
    const url = `${this.apiUrl}?origen=${origenId}&destino=${destinoId}&accesible=${necesitaAccesibilidad}`;
    return this.http.get(url);
  }
}