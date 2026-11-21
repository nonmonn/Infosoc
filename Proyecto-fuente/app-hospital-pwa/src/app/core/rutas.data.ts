import { Ruta } from './ruta.model';

export const RUTAS: Ruta[] = [
  {
    id: 'urgencia-psiquiatria',
    nombre: 'Urgencia → Psiquiatría',
    origen: 'Urgencia',
    destino: 'Psiquiatría',
    sinEscaleras: true,
    pasos: [
      {
        titulo: 'Sal por la puerta principal',
        imagenUrl: 'assets/rutas/urgencia-1.jpg',
        pictogramaUrl: 'assets/pictogramas/puerta.png',
        zonaRuidosa: true
      }
      // ...más pasos
    ]
  }
  // ...más rutas
];