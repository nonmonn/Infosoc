import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// 1. Nuevas interfaces para ordenar la estructura del hospital
export interface ZonaHospital {
  idNodo: number; // El ID real de tu base de datos para la ruta
  nombre: string;
}

export interface SectorHospital {
  nombreSector: string;
  zonas: ZonaHospital[];
}

export interface DestinoFrecuente {
  titulo: string;
  descripcion: string;
  icono: string;
  btn: string;
  color: string;
  opciones?: string[]; 
  abierto?: boolean;   
}

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  
  // 2. Nuestra "Mini base de datos" temporal enfocada solo en Psiquiatría
  sectoresDelHospital: SectorHospital[] = [
    {
      nombreSector: 'Psiquiatría',
      zonas: [
        { idNodo: 1, nombre: 'Recepción Psiquiatría' },
        { idNodo: 2, nombre: 'Box de Atención 1' },
        { idNodo: 3, nombre: 'Box de Atención 2' },
        { idNodo: 4, nombre: 'Sala de Terapia Grupal' },
        { idNodo: 5, nombre: 'Baños Psiquiatría' }
      ]
    }
  ];

  // Variables para saber qué eligió el usuario en el HTML
  sectorSeleccionado: SectorHospital | null = null;
  zonaSeleccionada: ZonaHospital | null = null;
  
  // 3. NUEVO: Variable para guardar si necesita ruta sin escaleras
  necesitaAccesibilidad: boolean = false;

  destinosFrecuentes: DestinoFrecuente[] = [
    { 
      titulo: 'Baños', descripcion: 'Servicios higiénicos', icono: 'wc', btn: 'Ver ruta', 
      color: 'bg-naranja-calido', opciones: ['Entrada', 'Pasillo'], abierto: false
    },
    { 
      titulo: 'BOX', descripcion: 'Zona de atención', icono: 'restaurant', btn: 'Ver ruta', 
      color: 'bg-amarillo-oro', opciones: ['BOX 1', 'BOX 2', 'BOX Procedimientos'], abierto: false
    },
    { 
      titulo: 'Informaciones', descripcion: 'Mesón central', icono: 'info', btn: 'Ver Ruta', 
      color: 'bg-naranja-calido', opciones: ['Sala Espera - Recepción', 'Entrega Recetas'], abierto: false
    }
  ];

  constructor(private router: Router) {} 

  // --- LÓGICA DE LOS NUEVOS MENÚS DESPLEGABLES Y ACCESIBILIDAD ---

  alCambiarSector(event: any) {
    const nombreElegido = event.target.value;
    // Buscamos el sector que coincide con lo que el usuario seleccionó
    this.sectorSeleccionado = this.sectoresDelHospital.find(s => s.nombreSector === nombreElegido) || null;
    // Reiniciamos la zona si el usuario cambia de sector a mitad de camino
    this.zonaSeleccionada = null; 
  }

  alCambiarZona(event: any) {
    const idZona = parseInt(event.target.value, 10);
    if (this.sectorSeleccionado) {
      this.zonaSeleccionada = this.sectorSeleccionado.zonas.find(z => z.idNodo === idZona) || null;
    }
  }

  // 4. NUEVO: Función que actualiza la variable cuando se marca el checkbox en el HTML
  toggleAccesibilidad(event: any) {
    this.necesitaAccesibilidad = event.target.checked;
  }

  iniciarRutaDesdeSelectores() {
    if (this.zonaSeleccionada) {
      // Navegamos a /rutas, adjuntando el ID del destino Y la preferencia de accesibilidad
      this.router.navigate(['/rutas'], { 
        queryParams: { 
          destino: this.zonaSeleccionada.idNodo,
          accesibilidad: this.necesitaAccesibilidad
        } 
      });
    }
  }

  // --- LÓGICA DE LOS DESTINOS FRECUENTES (INTACTA) ---
  accionLugar(destino: DestinoFrecuente) {
    if (destino.opciones && destino.opciones.length > 0) {
      const estadoActual = destino.abierto;
      this.destinosFrecuentes.forEach(d => d.abierto = false);
      destino.abierto = !estadoActual;
    } else {
      this.irARuta(destino.titulo);
    }
  }

  seleccionarPiso(titulo: string, piso: string) {
    this.destinosFrecuentes.forEach(d => d.abierto = false);
    this.irARuta(`${titulo} ${piso}`);
  }

  irARuta(destinoFinal: string) {
    this.router.navigate(['/rutas']);
  }
}