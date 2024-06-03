import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { CartService } from '../../services/cart.service';
import type { Item, PurchaseResponse } from '../../types/types';
import { HttpErrorResponse } from '@angular/common/http';
import { CartHistoryComponent } from '../cart-history/cart-history.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CartItemComponent,
    CommonModule,
    RouterLink,
    LoadingComponent,
    CartHistoryComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartItems: Item[] = [];
  totalAmount = 0;
  isLoading = true;
  purchaseConfirmed = false;
  purchase: PurchaseResponse = {} as PurchaseResponse;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        if (cart.message) return;

        this.cartItems = cart.items;
        const totalAmmout = this.cartItems.reduce((acc, item) => {
          return acc + item.cantidad * item.producto.precio;
        }, 0);
        this.totalAmount = totalAmmout;
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
          `Compra realizada, Numero de Factura ${response.purchase.nro_factura}`
        );
        this.purchase = response.purchase;
        this.purchaseConfirmed = true;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error && error.error.error) {
          alert(error.error.error);
        } else {
          console.error('Error al realizar la compra:', error);
          alert(
            'Ocurrió un error al realizar la compra, por favor intenta de nuevo.'
          );
        }
      },
    });
  }
}
