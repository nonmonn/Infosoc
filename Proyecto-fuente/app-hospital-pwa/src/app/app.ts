import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';


@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class AppComponent {
  protected readonly title = signal('app-hospital-pwa');
}
