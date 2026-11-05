import { Routes } from '@angular/router';
import { Home } from './features/home/home'; 
// Asegúrate de que la ruta de importación de tu Dashboard sea la correcta:
import { DashboardComponent } from './features/dashboard/dashboard'; 

export const routes: Routes = [
  { path: '', component: Home }, // La ruta vacía carga el instructivo
  { path: 'rutas', component: DashboardComponent }, // La ruta /rutas carga tu app
  { path: '**', redirectTo: '' } // Cualquier otra URL redirige al inicio
];
