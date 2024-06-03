import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IngresarProductosComponent } from '../ingresar-productos/ingresar-productos.component';
import { PurchaseHistoryComponent } from '../purchase-history/purchase-history.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    IngresarProductosComponent,
    PurchaseHistoryComponent,
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent {
  isAdmin = false;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.checkIsAdmin();
  }
}
