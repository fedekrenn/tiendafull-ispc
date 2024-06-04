import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseResponse } from '../../types/types';

@Component({
  selector: 'app-cart-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-history.component.html',
  styleUrl: './cart-history.component.css',
})
export class CartHistoryComponent {
  @Input() purchase: PurchaseResponse = {} as PurchaseResponse;
}
