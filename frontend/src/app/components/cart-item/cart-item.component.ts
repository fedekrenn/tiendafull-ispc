import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import type { Item } from '../../types/types';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() item: Item | undefined;
  @Output() itemDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cartService: CartService) {}

  deleteItem(itemId: number | undefined) {
    if (itemId) {
      this.cartService.deleteItem(itemId).subscribe({
        next: (res) => {
          alert('Se eliminó el producto del carrito');
          this.itemDeleted.emit(itemId);
          console.log(res);
        },
        error: (error) => {
          console.error('Error al eliminar producto: ', error);
          alert('Error al eliminar producto, por favor intenta de nuevo');
        },
      });
    } else {
      console.error('El ID del item es indefinido');
    }
  }
}
