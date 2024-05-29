import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.css'
})
export class LogoutPageComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe(
      data => {
      
        alert("Desconetado", )
        this.authService.clearToken();
        console.log("Usuario desconectado.");
        this.router.navigate(['/inicio']);
      },
      error => {
        console.error("Error al desconectar:", error);
      }
    );
  }
}


