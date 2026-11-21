import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { RutasGuardadasService } from '../../core/rutas-guardadas.service';
import { RutaGuardada } from '../../core/ruta.model';

@Component({
  selector: 'app-mis-rutas',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './mis-rutas.html'
})
export class MisRutas implements OnInit {
  rutas: RutaGuardada[] = [];

  constructor(
    private rutasService: RutasGuardadasService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.rutas = this.rutasService.obtenerTodas();
  }

  abrir(ruta: RutaGuardada) {
    this.router.navigate(['/rutas'], { queryParams: { guardada: ruta.id } });
  }

  eliminar(id: string) {
    this.rutasService.eliminar(id);
    this.rutas = this.rutasService.obtenerTodas();
  }

  volver() {
    this.location.back();
  }
}