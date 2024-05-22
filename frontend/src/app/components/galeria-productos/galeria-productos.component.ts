import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-galeria-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './galeria-productos.component.html',
  styleUrl: './galeria-productos.component.css',
})
export class GaleriaProductosComponent {
  bikes = [
    { nombre: 'Raleigh M2.0', imagen: 'raleigh-1.jpg', precio: '$200.000' },
    {nombre: 'Trinx Gravel', imagen: 'trinx-gravel-1.jpg', precio: '$350.000',},
    { nombre: 'Venzo Frida', imagen: 'venzo-frida-1.jpg', precio: '$189.000' },
  ];
}
