import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() id!: String;
  bike: Product = {} as Product;

  constructor(private productsService: ProductsService) {
    this.productsService.getProduct(+this.id).subscribe((data) => {
      this.bike = JSON.parse(JSON.stringify(data)).filter(
        (obj: Product) => obj.id == +this.id
      )[0];
    });
  }
}
