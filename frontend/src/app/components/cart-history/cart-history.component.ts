import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-history.component.html',
  styleUrl: './cart-history.component.css'
})
export class CartHistoryComponent {
  @Input() purchase: any | undefined;
}