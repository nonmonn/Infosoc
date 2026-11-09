import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ApiRutasService } from '../../core/api-rutas.service';

@Component({
    selector: 'app-rutas',
    templateUrl: './rutas.component.html'
})
export class RutasComponent implements OnInit {
    instruccionesRuta: any[] = [];
    cargando = false;
    errorMensaje = '';

    origenValor: number = 1; 
    destinoValor: string = '';

    constructor(
      private apiRutas: ApiRutasService,
      private route: ActivatedRoute 
    ){}

    ngOnInit() {
      // Leemos si viene un destino y preferencia desde el Dashboard
      this.route.queryParams.subscribe(params => {
        if (params['destino']) {
          this.destinoValor = params['destino'];
          
          const requiereAccesibilidad = params['accesibilidad'] === 'true';
          
          // Ejecutamos la búsqueda automáticamente
          this.buscarCamino(this.origenValor, Number(this.destinoValor), requiereAccesibilidad);
        }
      });
    }

    buscarCamino(origenId: number, destinoId: number, accesibilidad: boolean){
        this.cargando = true;
        this.errorMensaje = '';
        this.instruccionesRuta = []; // Limpiamos la ruta anterior

        this.apiRutas.getCalculoRuta(origenId, destinoId, accesibilidad).subscribe({
            next: (resultado: any) => {
                // Si la base de datos tiene datos reales, los usamos
                if (resultado.instrucciones && resultado.instrucciones.length > 0) {
                    this.instruccionesRuta = resultado.instrucciones;
                } else {
                    // Si la BD está vacía, mostramos un mensaje de error
                    this.errorMensaje = 'No se encontró una ruta válida en la base de datos.';
                }
                this.cargando = false;
            },
            error: (err: any) => {
                console.error('Error del servidor:', err);
                this.errorMensaje = 'No pudimos calcular la ruta. Verifica tu base de datos o conexión.';
                this.cargando = false;
            }
        });
    }
}