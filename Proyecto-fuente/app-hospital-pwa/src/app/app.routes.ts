import { Routes } from '@angular/router';
import { Home } from './features/home/home'; 
import { DashboardComponent } from './features/dashboard/dashboard';
import { RutasComponent } from './features/rutas/rutas.component'; 

export const routes: Routes = [
  //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }, //revisar!!!
  { path: '', component: Home }, // La ruta vacía carga el instructivo (bienvenida)
  { path: 'dashboard', component: DashboardComponent }, // El menú principal (donde están los botones)
  { path: 'rutas', component: RutasComponent }, // El nuevo buscador interactivo de caminos
  {
    path: 'mis-rutas', // Rutas guardadas en el caché
    loadComponent: () =>
      import('./features/mis-rutas/mis-rutas').then(m => m.MisRutas)
  },
  { path: '**', redirectTo: '' }, // Cualquier otra URL mal escrita redirige al inicio (siempre al final)
  //{ path: '**', redirectTo: 'dashboard' } //revisar!!!!
];