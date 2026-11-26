import { Component, HostListener, OnDestroy, OnInit, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

// 1. Interfaces para ordenar la estructura del hospital
export interface ZonaHospital {
  idNodo: number;
  nombre: string;
  codigoRuta?: string;
}

export interface SectorHospital {
  nombreSector: string;
  deshabilitado?: boolean;
  imagenEdificio?: string;
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

export type ZonaTutorial = 'selector' | 'mapa' | 'frecuentes' | 'misrutas';

export interface RectMisRutas {
  top: number; left: number; width: number; height: number;
  popTop: number; popLeft: number;
  flecha: number;
}

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
export class DashboardComponent implements OnInit, OnDestroy {

  // Imágenes de la vista general de edificios y del edificio de Psiquiatría
  imagenHospitalGeneral: string = '/imagenes/hospital_general.jpg';

  // 2. Sectores sincronizados con las opciones de Rutas Frecuentes
  sectoresDelHospital: SectorHospital[] = [
    {
      nombreSector: 'Psiquiatría',
      imagenEdificio: '/imagenes/edificio_psiquiatria.jpg',
      zonas: [
        { idNodo: 1, nombre: 'Baños - Entrada', codigoRuta: 'bano_1' },
        { idNodo: 2, nombre: 'Baños - Pasillo', codigoRuta: 'bano_2' },
        { idNodo: 3, nombre: 'BOX 1', codigoRuta: 'box_1' },
        { idNodo: 4, nombre: 'BOX 2', codigoRuta: 'box_2' },
        { idNodo: 5, nombre: 'BOX Procedimientos', codigoRuta: 'box_procedimientos' },
        { idNodo: 6, nombre: 'Sala Espera - Recepción', codigoRuta: 'recepcion_1' },
        { idNodo: 7, nombre: 'Entrega Recetas', codigoRuta: 'entrega_recetas' }
      ]
    },
    {
      nombreSector: 'Próximamente más sectores...',
      deshabilitado: true,
      zonas: []
    }
  ];

  // Variables para saber qué eligió el usuario en el HTML
  sectorSeleccionado: SectorHospital | null = null;
  zonaSeleccionada: ZonaHospital | null = null;

  // 3. Variable para guardar si necesita ruta sin escaleras
  necesitaAccesibilidad: boolean = false;

  destinosFrecuentes: DestinoFrecuente[] = [
    {
      titulo: 'Baños', descripcion: 'Servicios higiénicos', icono: '/imagenes/pictogramas/bano2.png', btn: 'Trazar ruta acá',
      color: 'bg-naranja-calido', opciones: ['Entrada', 'Pasillo'], abierto: false
    },
    {
      titulo: 'BOX', descripcion: 'Zona de atención', icono: '/imagenes/pictogramas/boxes2.png', btn: 'Trazar ruta acá',
      color: 'bg-amarillo-oro', opciones: ['BOX 1', 'BOX 2', 'BOX Procedimientos'], abierto: false
    },
    {
      titulo: 'Informaciones', descripcion: 'Mesón central', icono: '/imagenes/pictogramas/informaciones.png', btn: 'Trazar ruta acá',
      color: 'bg-naranja-calido', opciones: ['Sala Espera - Recepción', 'Entrega Recetas'], abierto: false
    }
  ];

  // --- TUTORIAL DE PRIMERA VEZ ---
  private platformId = inject(PLATFORM_ID);
  private readonly CLAVE_TUTORIAL = 'tutorialVisto';

  mostrarTutorial = signal(false);
  pasoActual = signal(0);

  pasosTutorial: PasoTutorial[] = [
    { icono: '/imagenes/pictogramas/pin.png', titulo: 'Busca tu destino', texto: 'Aquí eliges a qué lugar del hospital necesitas ir hoy.', zona: 'selector' },
    { icono: '/imagenes/pictogramas/pasos.png', titulo: 'Avanza a tu ritmo', texto: 'Sigue las fotos y los pictogramas, paso a paso.', zona: 'mapa' },
    { icono: '/imagenes/pictogramas/check.png', titulo: 'Llega sin estrés', texto: 'Te avisaremos cuando hayas llegado.', zona: 'mapa' },
    { icono: '/imagenes/pictogramas/rayo.png', titulo: 'Rutas frecuentes', texto: 'Atajos a los lugares más visitados: baños, boxes e informaciones.', zona: 'frecuentes' },
    { icono: '/imagenes/pictogramas/estrella.png', titulo: 'Rutas guardadas', texto: 'En «Mis Rutas» verás las rutas que guardes para volver a usarlas.', zona: 'misrutas' }
  ];

  zonaActual = computed<ZonaTutorial | null>(() =>
    this.mostrarTutorial() ? this.pasosTutorial[this.pasoActual()].zona : null
  );

  rectMisRutas = signal<RectMisRutas | null>(null);

  spotlight = computed<RectMisRutas | null>(() =>
    this.zonaActual() === 'misrutas' ? this.rectMisRutas() : null
  );

  // Evita el scroll del usuario mientras el tutorial está abierto
  private bloqueador = (e: Event) => e.preventDefault();

  constructor(private router: Router) {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.mostrarTutorial() ? this.bloquearScroll() : this.desbloquearScroll();
    });
  }

  private bloquearScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    // Necesario en iOS/Safari, donde overflow:hidden no siempre basta
    window.addEventListener('wheel', this.bloqueador, { passive: false });
    window.addEventListener('touchmove', this.bloqueador, { passive: false });
  }

  private desbloquearScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.removeEventListener('wheel', this.bloqueador);
    window.removeEventListener('touchmove', this.bloqueador);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) this.desbloquearScroll();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (!localStorage.getItem(this.CLAVE_TUTORIAL)) {
          this.mostrarTutorial.set(true);
          setTimeout(() => this.desplazarAZona(this.pasosTutorial[0].zona), 0);
        }
      } catch {
        // Ignorar si el navegador bloquea el almacenamiento
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
    const zona = this.pasosTutorial[n].zona;
    if (zona === 'misrutas') {
      this.medirMisRutas();
    }
    this.desplazarAZona(zona);
  }

  private desplazarAZona(zona: ZonaTutorial) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (zona === 'misrutas') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // En computador las zonas están lado a lado: se centran en pantalla.
    // En celular van apiladas: se llevan al inicio de la pantalla.
    const esComputador = window.innerWidth >= 1024;
    document.getElementById('zona-' + zona)
      ?.scrollIntoView({ behavior: 'smooth', block: esComputador ? 'center' : 'start' });
  }

  private medirMisRutas() {
    if (!isPlatformBrowser(this.platformId)) return;
    const boton = document.getElementById('nav-mis-rutas');
    const r = boton?.getBoundingClientRect();
    if (!r || r.width === 0) {
      this.rectMisRutas.set(null);
      return;
    }
    const anchoGlobo = 288;
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
    this.desplazarAZona(this.pasosTutorial[0].zona);
  }

  // --- LÓGICA DE LOS MENÚS DESPLEGABLES Y ACCESIBILIDAD ---

  alCambiarSector(event: any) {
    const nombreElegido = event.target.value;
    this.sectorSeleccionado = this.sectoresDelHospital.find(s => s.nombreSector === nombreElegido && !s.deshabilitado) || null;
    this.zonaSeleccionada = null;
  }

  alCambiarZona(event: any) {
    const idZona = parseInt(event.target.value, 10);
    if (this.sectorSeleccionado) {
      this.zonaSeleccionada = this.sectorSeleccionado.zonas.find(z => z.idNodo === idZona) || null;
    }
  }

  toggleAccesibilidad(event: any) {
    this.necesitaAccesibilidad = event.target.checked;
  }

  iniciarRutaDesdeSelectores() {
    if (this.zonaSeleccionada) {
      const mapaNodos: Record<number, string> = {
        1: 'bano_1',
        2: 'bano_2',
        3: 'box_1',
        4: 'box_2',
        5: 'box_procedimientos',
        6: 'recepcion_1',
        7: 'entrega_recetas'
      };

      const codigoDestino = this.zonaSeleccionada.codigoRuta 
        || mapaNodos[this.zonaSeleccionada.idNodo] 
        || 'bano_1';

      this.router.navigate(['/rutas'], {
        queryParams: {
          destino: codigoDestino,
          accesibilidad: this.necesitaAccesibilidad
        }
      });
    }
  }

  // --- LÓGICA DE LOS DESTINOS FRECUENTES ---
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
    const mapaFrecuentes: Record<string, string> = {
      'Baños Entrada': 'bano_1',
      'Baños Pasillo': 'bano_2',
      'BOX BOX 1': 'box_1',
      'BOX BOX 2': 'box_2',
      'BOX BOX Procedimientos': 'box_procedimientos',
      'Informaciones Sala Espera - Recepción': 'recepcion_1',
      'Informaciones Entrega Recetas': 'entrega_recetas'
    };

    const codigoDestino = mapaFrecuentes[destinoFinal] || 'bano_1';

    this.router.navigate(['/rutas'], {
      queryParams: {
        destino: codigoDestino,
        accesibilidad: this.necesitaAccesibilidad
      }
    });
  }
}