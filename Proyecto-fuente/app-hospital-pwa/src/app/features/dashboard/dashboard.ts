import { Component, HostListener, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

// 1. Interfaces para ordenar la estructura del hospital
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

// Dónde se muestra cada paso del tutorial:
// 'selector' = junto a "¿Hacia dónde deseas ir?", 'mapa' = junto a "Nuevo Mapa Interactivo",
// 'frecuentes' = junto a "Rutas Frecuentes", 'misrutas' = junto al botón "Mis Rutas" del menú de arriba
// (si ese botón no se ve, como en celulares, se muestra una ventana al centro)
export type ZonaTutorial = 'selector' | 'mapa' | 'frecuentes' | 'misrutas';

// Posición (en pantalla) del botón "Mis Rutas" y de su globo
export interface RectMisRutas {
  top: number; left: number; width: number; height: number; // el botón
  popTop: number; popLeft: number;                           // el globo
  flecha: number;                                            // posición de la flechita dentro del globo
}

// Paso del tutorial de primera vez
export interface PasoTutorial {
  icono: string;
  titulo: string;
  texto: string;
  zona: ZonaTutorial;
}

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {

  // 2. "Mini base de datos" temporal enfocada solo en Psiquiatría
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

  // 3. Variable para guardar si necesita ruta sin escaleras
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

  // --- TUTORIAL DE PRIMERA VEZ ---
  private platformId = inject(PLATFORM_ID);
  private readonly CLAVE_TUTORIAL = 'tutorialVisto';

  mostrarTutorial = signal(false);
  pasoActual = signal(0);

  // Cuando tengas los pictogramas ARASAAC o capturas, reemplaza 'icono' por una imagen
  pasosTutorial: PasoTutorial[] = [
    { icono: '📍', titulo: 'Busca tu destino', texto: 'Aquí eliges a qué lugar del hospital necesitas ir hoy.', zona: 'selector' },
    { icono: '👣', titulo: 'Avanza a tu ritmo', texto: 'Sigue las fotos y los pictogramas, paso a paso.', zona: 'mapa' },
    { icono: '✅', titulo: 'Llega sin estrés', texto: 'Te avisaremos cuando hayas llegado.', zona: 'mapa' },
    { icono: '⚡', titulo: 'Rutas frecuentes', texto: 'Atajos a los lugares más visitados: baños, boxes e informaciones.', zona: 'frecuentes' },
    { icono: '⭐', titulo: 'Rutas guardadas', texto: 'En «Mis Rutas» verás las rutas que guardes para volver a usarlas.', zona: 'misrutas' }
  ];

  // Zona de la pantalla que se resalta ahora (null si el tutorial está cerrado)
  zonaActual = computed<ZonaTutorial | null>(() =>
    this.mostrarTutorial() ? this.pasosTutorial[this.pasoActual()].zona : null
  );

  // Posición del botón "Mis Rutas" (solo se mide durante ese paso)
  rectMisRutas = signal<RectMisRutas | null>(null);

  // Lo que se resalta en el paso "Mis Rutas" (null si no es ese paso o el botón no se ve)
  spotlight = computed<RectMisRutas | null>(() =>
    this.zonaActual() === 'misrutas' ? this.rectMisRutas() : null
  );

  constructor(private router: Router) {}

  ngOnInit() {
    // localStorage solo existe en el navegador (no en el servidor SSR)
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (!localStorage.getItem(this.CLAVE_TUTORIAL)) {
          this.mostrarTutorial.set(true);
        }
      } catch {
        // Si el navegador bloquea el almacenamiento, simplemente no se muestra
      }
    }
  }

  siguientePaso() {
    if (this.pasoActual() < this.pasosTutorial.length - 1) {
      this.irAPaso(this.pasoActual() + 1);
    } else {
      this.cerrarTutorial();
    }
  }

  pasoAnterior() {
    if (this.pasoActual() > 0) {
      this.irAPaso(this.pasoActual() - 1);
    }
  }

  cerrarTutorial() {
    this.mostrarTutorial.set(false);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.CLAVE_TUTORIAL, 'true');
      } catch {
        // Ignorar si no se puede guardar
      }
    }
  }

  private irAPaso(n: number) {
    this.pasoActual.set(n);
    if (this.pasosTutorial[n].zona === 'misrutas') {
      this.medirMisRutas();
    }
  }

  // Busca el botón "Mis Rutas" del menú y calcula dónde poner el resaltado y el globo
  private medirMisRutas() {
    if (!isPlatformBrowser(this.platformId)) return;
    const boton = document.getElementById('nav-mis-rutas');
    const r = boton?.getBoundingClientRect();
    if (!r || r.width === 0) {
      // El botón está oculto (por ejemplo en celular): se usa la ventana al centro
      this.rectMisRutas.set(null);
      return;
    }
    const anchoGlobo = 288; // igual a w-72
    const centro = r.left + r.width / 2;
    const popLeft = Math.max(16, Math.min(centro - anchoGlobo / 2, window.innerWidth - anchoGlobo - 16));
    this.rectMisRutas.set({
      top: r.top, left: r.left, width: r.width, height: r.height,
      popTop: r.bottom + 20, popLeft,
      flecha: centro - popLeft - 8
    });
  }

  @HostListener('window:resize')
  alCambiarTamano() {
    if (this.zonaActual() === 'misrutas') {
      this.medirMisRutas();
    }
  }

  verTutorial() {
    this.pasoActual.set(0);
    this.mostrarTutorial.set(true);
  }

  // --- LÓGICA DE LOS MENÚS DESPLEGABLES Y ACCESIBILIDAD ---

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

  // Actualiza la variable cuando se marca el checkbox en el HTML
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