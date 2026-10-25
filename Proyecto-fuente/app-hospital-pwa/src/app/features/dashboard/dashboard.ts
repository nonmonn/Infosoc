import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  destinosFrecuentes = [
    { titulo: 'Baños', descripcion: 'Servicios higiénicos', icono: 'wc', btn: 'Ver ruta', color: 'bg-naranja-calido' },
    { titulo: 'Cafetería', descripcion: 'Zona de alimentación', icono: 'restaurant', btn: 'Ver ruta', color: 'bg-amarillo-oro' },
    { titulo: 'Informaciones', descripcion: 'Mesón central', icono: 'info', btn: 'Ver Ruta', color: 'bg-naranja-calido' }
  ];

  guardarRuta(){
    console.log('Ruta a Psiquiatría guardada en el dispositivo');
    alert('Ruta guardada exitosamente en "Mis Rutas"');
  }
}
