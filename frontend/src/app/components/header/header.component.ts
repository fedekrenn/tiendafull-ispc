import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userEmail = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLogged.subscribe((logged) => {
      this.isLoggedIn = logged;
    });
    this.authService.userEmail.subscribe((email) => {
      this.userEmail = email;
    });
  }
}
