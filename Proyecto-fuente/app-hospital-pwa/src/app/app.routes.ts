import { Routes } from '@angular/router';
import { Home } from './features/home/home'; 
import { DashboardComponent } from './features/dashboard/dashboard';
import { RutasComponent } from './features/rutas/rutas.component'; 

export const routes: Routes = [
  { path: '', component: Home }, // La ruta vacía carga el instructivo (bienvenida)
  { path: 'dashboard', component: DashboardComponent }, // El menú principal (donde están los botones)
  { path: 'rutas', component: RutasComponent }, // El nuevo buscador interactivo de caminos
  { path: '**', redirectTo: '' } // Cualquier otra URL mal escrita redirige al inicio
];