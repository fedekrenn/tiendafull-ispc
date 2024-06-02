import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { CartService } from '../../services/cart.service';
import type { Item } from '../../types/types';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartItemComponent, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartItems: Item[] = [];
  totalAmount = 0;
  isLoading = true;

  constructor(private cartService: CartService) {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItems = cart.items;
        this.isLoading = false;
        const totalAmmout = this.cartItems.reduce((acc, item) => {
          return acc + item.cantidad * item.producto.precio;
        }, 0);
        this.totalAmount = totalAmmout;
      },
      error: (error) => console.error(error),
    });
  }
  onDeleteItem(itemId: number) {
    
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.cantidad * item.producto.precio, 0);
  }
  realizarCompra() {
    this.cartService.confirmarCompra().subscribe({
      next: (response) => {
        console.log('Compra realizada:', response);
        alert(`Compra realizada, Numero de Factura  ${response.purchase.nro_factura}`)
   
      },
      error: (error) => {
        console.error('Error al realizar la compra:', error);
      
      }
    }
  
  );
 


  }
}
