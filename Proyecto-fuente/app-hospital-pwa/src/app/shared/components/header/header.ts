import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  menuAbierto = false;

  toggleMenu(){
    this.menuAbierto = !this.menuAbierto;
  }
}
