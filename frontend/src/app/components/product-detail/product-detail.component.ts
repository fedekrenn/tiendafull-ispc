import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../types/types';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  bike: Product = {} as Product;
  cantidad = 1;
  loading = true;
  isLoggedIn = false;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.authService.isLogged.subscribe((logged) => {
      this.isLoggedIn = logged;
    });
  }

  getProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productsService.getProduct(Number(productId)).subscribe({
        next: (data) => {
          this.bike = data;
        },
        error: (error) => {
          console.error('Error al obtener el producto: ', error);
          alert('Error al obtener el producto, por favor intenta de nuevo');
        },
        complete: () => (this.loading = false),
      });
    } else {
      console.error('El ID en la URL es indefinido o no es válido');
    }
  }

  addItemCart(productId: number | undefined) {
    if (productId) {
      this.cartService.addItem(productId, this.cantidad).subscribe({
        next: (res) => {
          alert('Se agregó el producto al carrito.');
          console.log(res, productId, this.cantidad);
        },
        error: (error) => {
          console.error('Error al agregar el producto al carrito: ', error);
          alert('Error al agregar el producto, por favor intenta de nuevo');
        },
      });
    } else {
      console.error('El ID del producto es indefinido');
    }
  }
}
