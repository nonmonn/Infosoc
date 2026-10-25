import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';

@Component({
  imports: [RouterOutlet, DashboardComponent],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class AppComponent {
  protected readonly title = signal('app-hospital-pwa');
}
