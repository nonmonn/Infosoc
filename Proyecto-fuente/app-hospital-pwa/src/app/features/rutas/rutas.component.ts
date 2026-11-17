import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { ApiRutasService } from '../../core/api-rutas.service';

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
  cargando = false;
  errorMensaje = '';

  origenValor: string = 'entrada_prin'; 
  destinoValor: string = 'bano_1';
  requiereAccesibilidad: boolean = false;

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private apiRutas: ApiRutasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get pasoActual(): any {
    return this.instruccionesRuta[this.pasoActualIndex] || null;
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.route.queryParams.subscribe(params => {
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
              imagenes: p.imagenes ?? [{ url: p.imagenUrl, alt: p.instruccion }],
              fotoActualIndex: 0,
              pictograma: p.pictograma ?? null
            }));
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

  cambiarFotoPaso(paso: any, indiceFoto: number) {
    paso.fotoActualIndex = indiceFoto;
    paso.imagenUrl = paso.imagenes[indiceFoto].url;
    this.cdr.detectChanges();
  }

  siguientePaso() {
    if (this.pasoActualIndex < this.instruccionesRuta.length - 1) {
      this.pasoActualIndex++;
      this.cdr.detectChanges();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  pasoAnterior() {
    if (this.pasoActualIndex > 0) {
      this.pasoActualIndex--;
      this.cdr.detectChanges();
    }
  }
}