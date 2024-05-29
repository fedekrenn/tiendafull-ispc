import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required], []],
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required], []],
    });
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  validarUsuario() {
    if (this.form.value.email != '' && this.form.value.password != '') {
      const logUser = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.authService.login(logUser).subscribe({
        next: (res) => {
          if (res.token) {
            sessionStorage.setItem('token', res.token);
            console.log(res)
            sessionStorage.setItem('isAdmin', res.is_staff);
            alert('Usuario logueado');
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          alert('Error al iniciar sesión, por favor intenta de nuevo');
          console.error(error);
        },
      });
    }
  }
}
