import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { ApiRutasService } from '../../core/api-rutas.service';
import { RutasGuardadasService } from '../../core/rutas-guardadas.service';

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent implements OnInit {
  instruccionesRuta: any[] = [];
  pasoActualIndex: number = 0;
  marcadorActivoId: string | null = null; // Controla qué globo flotante está abierto
  cargando = false;
  errorMensaje = '';

  origenValor: string = 'entrada_prin'; 
  destinoValor: string = 'bano_1';
  requiereAccesibilidad: boolean = false;

  guardada = false;

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private rutasGuardadas = inject(RutasGuardadasService);

  constructor(
    private apiRutas: ApiRutasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get pasoActual(): any {
    return this.instruccionesRuta[this.pasoActualIndex] || null;
  }

  // Identificador único de la ruta actual
  get idRutaActual(): string {
    return `${this.origenValor}|${this.destinoValor}|${this.requiereAccesibilidad}`;
  }

  // Devuelve los marcadores flotantes de la vista (foto) seleccionada actualmente
  get marcadoresActuales(): any[] {
    if (!this.pasoActual || !this.pasoActual.imagenes) return [];
    const fotoActiva = this.pasoActual.imagenes[this.pasoActual.fotoActualIndex];
    return fotoActiva?.marcadores || [];
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.route.queryParams.subscribe(params => {
      // Si viene desde "Mis rutas", carga la ruta desde el caché
      if (params['guardada']) {
        const ruta = this.rutasGuardadas.obtener(String(params['guardada']));
        if (ruta) {
          this.cargarDesdeCache(ruta);
          return;
        }
      }

      if (params['destino']) {
        const destParam = String(params['destino']);
        this.destinoValor = (destParam === '1' || destParam === '5' || destParam === 'bano') 
          ? 'bano_1' 
          : destParam;
        
        this.requiereAccesibilidad = params['accesibilidad'] === 'true';
        this.buscarCamino(this.origenValor, this.destinoValor, this.requiereAccesibilidad);
      } else {
        this.buscarCamino(this.origenValor, 'bano_1', false);
      }
    });
  }

  buscarCamino(origenId: string, destinoId: string, accesibilidad: boolean) {
    this.cargando = true;
    this.errorMensaje = '';
    this.instruccionesRuta = [];
    this.pasoActualIndex = 0;
    this.marcadorActivoId = null;
    this.guardada = false;
    this.cdr.detectChanges();

    const tiempoMinimoCarga = 1200; // 1.2 segundos para que se aprecie la mini pantalla de carga
    const inicio = Date.now();

    this.apiRutas.getCalculoRuta(origenId, destinoId, accesibilidad).subscribe({
      next: (resultado: any) => {
        const pasosBackend = resultado?.pasos || resultado?.instrucciones || [];
        const transcurrido = Date.now() - inicio;
        const esperaRestante = Math.max(0, tiempoMinimoCarga - transcurrido);

        setTimeout(() => {
          if (pasosBackend.length > 0) {
            this.instruccionesRuta = pasosBackend.map((p: any, index: number) => ({
              id: p.id ?? p.orden ?? index + 1,
              orden: p.orden ?? index + 1,
              desde: p.desde,
              hasta: p.hasta,
              instruccion: p.instruccion ?? p.texto,
              imagenUrl: p.imagenUrl ?? p.imagenes?.[0]?.url ?? '/imagenes/imagen 1.jpg',
              imagenes: p.imagenes ?? [{ url: p.imagenUrl, alt: p.instruccion, marcadores: [] }],
              fotoActualIndex: 0,
              pictograma: p.pictograma ?? null
            }));
            // Revisa si esta ruta ya estaba guardada
            this.guardada = this.rutasGuardadas.estaGuardada(this.idRutaActual);
          } else {
            this.errorMensaje = 'No se encontró una ruta válida para este destino.';
          }
          this.cargando = false;
          this.cdr.detectChanges();
        }, esperaRestante);
      },
      error: (err: any) => {
        console.error('Error del servidor:', err);
        this.errorMensaje = 'No pudimos cargar la ruta. Verifica que el backend esté corriendo en el puerto 3000.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // "bano_1" -> "Bano 1"
  private formatear(id: string): string {
    const texto = id.replace(/_/g, ' ');
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  // Muestra una ruta guardada sin llamar al backend
  private cargarDesdeCache(ruta: any) {
    this.origenValor = ruta.origen;
    this.destinoValor = ruta.destino;
    this.requiereAccesibilidad = ruta.accesibilidad;
    this.instruccionesRuta = ruta.pasos.map((p: any) => ({ ...p, fotoActualIndex: 0 }));
    this.pasoActualIndex = 0;
    this.marcadorActivoId = null;
    this.errorMensaje = '';
    this.cargando = false;
    this.guardada = true;
    this.cdr.detectChanges();
  }

  // Guardar o quitar la ruta de "Mis rutas"
  alternarGuardado() {
    if (this.instruccionesRuta.length === 0) return;

    if (this.guardada) {
      this.rutasGuardadas.eliminar(this.idRutaActual);
      this.guardada = false;
    } else {
      this.rutasGuardadas.guardar({
        id: this.idRutaActual,
        nombre: `${this.formatear(this.origenValor)} → ${this.formatear(this.destinoValor)}`,
        origen: this.origenValor,
        destino: this.destinoValor,
        accesibilidad: this.requiereAccesibilidad,
        pasos: this.instruccionesRuta
      });
      this.guardada = true;
    }
    this.cdr.detectChanges();
  }

  cambiarFotoPaso(paso: any, indiceFoto: number) {
    paso.fotoActualIndex = indiceFoto;
    paso.imagenUrl = paso.imagenes[indiceFoto].url;
    this.marcadorActivoId = null; // Cierra cualquier globo al cambiar de vista
    this.cdr.detectChanges();
  }

  // Abre o cierra el globo explicativo al tocar el círculo naranja
  toggleMarcador(id: string, event: Event) {
    event.stopPropagation();
    this.marcadorActivoId = this.marcadorActivoId === id ? null : id;
    this.cdr.detectChanges();
  }

  cerrarMarcadores() {
    if (this.marcadorActivoId) {
      this.marcadorActivoId = null;
      this.cdr.detectChanges();
    }
  }

  siguientePaso() {
    this.marcadorActivoId = null;
    if (this.pasoActualIndex < this.instruccionesRuta.length - 1) {
      this.pasoActualIndex++;
      this.cdr.detectChanges();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  pasoAnterior() {
    this.marcadorActivoId = null;
    if (this.pasoActualIndex > 0) {
      this.pasoActualIndex--;
      this.cdr.detectChanges();
    }
  }
}