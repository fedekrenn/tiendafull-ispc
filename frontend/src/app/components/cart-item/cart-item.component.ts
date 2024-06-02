import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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
  constructor(private cartService: CartService, private router: Router) {}



  deleteItem(itemId: number | undefined) {
    if(itemId){
      this.cartService.deleteItem(itemId).subscribe({
        next:(res)=> {
          alert('Se eliminó el producto del carrito');
          this.router.navigate(['/carrito']);
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
