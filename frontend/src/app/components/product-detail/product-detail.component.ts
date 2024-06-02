import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/types';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  bike: Product = {} as Product;
  cantidad: number = 1;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
<<<<<<< HEAD

    if(productId){
=======
    if (productId) {
>>>>>>> e3627ed85031c8416ecae360a3771a3451a8a052
      this.productsService.getProduct(Number(productId)).subscribe((data) => {
        this.bike = data;
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
<<<<<<< HEAD
      
=======
>>>>>>> e3627ed85031c8416ecae360a3771a3451a8a052
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
