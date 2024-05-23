import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-galeria-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  bikes: Product[] = [];
  
  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe((data) => {
      this.bikes = data;
    });
  }
  
  // bikes = [
  //   { id: 1, nombre: 'Raleigh M2.0', imagen: 'raleigh-1.jpg', precio: '$200.000' },
  //   { id: 2, nombre: 'Trinx Gravel', imagen: 'trinx-gravel-1.jpg', precio: '$350.000',},
  //   { id: 3, nombre: 'Venzo Frida', imagen: 'venzo-frida-1.jpg', precio: '$189.000' },
  // ];
}
