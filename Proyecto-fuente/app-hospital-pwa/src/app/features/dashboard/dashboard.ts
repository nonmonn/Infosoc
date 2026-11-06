import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DestinoFrecuente {
  titulo: string;
  descripcion: string;
  icono: string;
  btn: string;
  color: string;
  opciones?: string[]; // Lista opcional de pisos/sectores
  abierto?: boolean;   // Controla si el mini menú está desplegado
}

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  destinosFrecuentes: DestinoFrecuente[] = [
    { 
      titulo: 'Baños', 
      descripcion: 'Servicios higiénicos', 
      icono: 'wc', 
      btn: 'Ver ruta', 
      color: 'bg-naranja-calido',
      opciones: ['Entrada', 'Pasillo'],
      abierto: false
    },
    { 
      titulo: 'BOX', 
      descripcion: 'Zona de atención', 
      icono: 'restaurant', 
      btn: 'Ver ruta', 
      color: 'bg-amarillo-oro',
      opciones: ['BOX 1', 'BOX 2', 'BOX Procedimientos'],
      abierto: false
    },
    { 
      titulo: 'Informaciones', 
      descripcion: 'Mesón central', 
      icono: 'info', 
      btn: 'Ver Ruta', 
      color: 'bg-naranja-calido', 
      opciones: ['Sala Espera - Recepción', 'Entrega Recetas'],
      abierto: false
    }
  ];

  // Se ejecuta al hacer clic en el botón "Ver ruta" de cualquier tarjeta
  accionLugar(destino: DestinoFrecuente) {
    if (destino.opciones && destino.opciones.length > 0) {
      // Si tiene pisos, abre/cierra este menú y cierra los demás
      const estadoActual = destino.abierto;
      this.destinosFrecuentes.forEach(d => d.abierto = false);
      destino.abierto = !estadoActual;
    } else {
      // Si no tiene sub-opciones (ej. Informaciones), va directo a la ruta
      this.irARuta(destino.titulo);
    }
  }

  // Se ejecuta al elegir un piso específico del mini menú
  seleccionarPiso(titulo: string, piso: string) {
    this.destinosFrecuentes.forEach(d => d.abierto = false);
    this.irARuta(`${titulo} - ${piso}`);
  }

  irARuta(destinoFinal: string) {
    console.log(`Trazando ruta hacia: ${destinoFinal}`);
    // Aquí puedes conectar la lógica para cambiar las imágenes del Recorrido Virtual
  }

  guardarRuta() {
    console.log('Ruta a Psiquiatría guardada en el dispositivo');
    alert('Ruta guardada exitosamente en "Mis Rutas"');
  }
}