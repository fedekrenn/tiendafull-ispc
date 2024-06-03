import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import type { Item } from '../../types/types';

@Component({
  selector: 'app-cart-page',
  templateUrl: './components/product-detail/product-detail.component',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartItems: Item[] = [];
  totalAmount = 0;
  isLoading = true;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        if (cart.message) return;

        this.cartItems = cart.items;
        const totalAmount = this.cartItems.reduce((acc, item) => {
          return acc + item.cantidad * item.producto.precio;
        }, 0);
        this.totalAmount = totalAmount;
      },
      error: (error) => console.error(error),
      complete: () => (this.isLoading = false),
    });
  }

  onDeleteItem(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);

    this.totalAmount = this.cartItems.reduce(
      (acc, item) => acc + item.cantidad * item.producto.precio,
      0
    );
  }

  realizarCompra() {
    this.cartService.confirmarCompra().subscribe({
      next: (response) => {
        console.log('Compra realizada:', response);
        alert(
          `Compra realizada, Numero de Factura  ${response.purchase.nro_factura}`
        );
      },
      error: (error) => {
        console.error('Error al realizar la compra:', error);
      },
    });
  }
}
