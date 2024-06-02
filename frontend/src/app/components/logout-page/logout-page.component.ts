import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.css',
})
export class LogoutPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        alert('Has sido desconectado correctamente! Hasta la próxima!');
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Error al desconectar:', error);
        alert('Error al desconectar, por favor intenta de nuevo');
      },
    });
  }
}
