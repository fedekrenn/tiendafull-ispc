import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseResponse } from '../../types/types';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css',
})
export class PurchaseHistoryComponent {
  purchases: PurchaseResponse[] = [];
  isLoading = true;

  constructor(private purchaseService: PurchaseService) {}

  public ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe({
      next: (response) => (this.purchases = response),
      error: (error) => console.error(error),
      complete: () => (this.isLoading = false),
    });
  }
}
