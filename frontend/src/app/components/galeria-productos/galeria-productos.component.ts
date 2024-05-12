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
export class GaleriaProductosComponent {}
