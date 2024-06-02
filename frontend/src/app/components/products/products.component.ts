import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ProductsService } from '../../services/products.service';
import type { Product } from '../../types/types';

@Component({
  selector: 'app-galeria-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  bikes: Product[] = [];
  loading: boolean = true;

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe({
      next: (bikesList) => (this.bikes = bikesList),
      error: (error) => console.error(error),
      complete: () => (this.loading = false),
    });
  }
}
