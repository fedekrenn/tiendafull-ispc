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
  loading: boolean = true;
  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe((data) => {
      this.loading = false;
      console.log(data);
      this.bikes = data;
    });
  }
}
