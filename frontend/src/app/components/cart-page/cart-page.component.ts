import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import type { Item } from '../../types/types';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartItems: Item[] = [];
  totalAmount = 0;

  constructor(private cartService: CartService) {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItems = cart.items;
        const totalAmmout = this.cartItems.reduce((acc, item) => {
          return acc + item.cantidad * item.producto.precio;
        }, 0);
        this.totalAmount = totalAmmout;
      },
      error: (error) => console.error(error),
    });
  }
}
