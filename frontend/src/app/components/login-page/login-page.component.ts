import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required], []],
    });
  }

  get Password() {
    return this.form.get('password');
  }

  get Email() {
    return this.form.get('email');
  }

  validarUsuario() {
    if (this.form.value.email != '' && this.form.value.password != '') {
      const logUser = {
        username: 'ferbarletta@gmail.com', // Deberíamos eliminar el campo en  el back
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.authService
        .login(logUser)
        .pipe(
          catchError((error) => {
            alert('Error al iniciar sesión, por favor intenta de nuevo');
            return throwError(error);
          })
        )
        .subscribe((res) => {
          if (res.token) {
            sessionStorage.setItem('token', res.token);
            alert('Usuario logueado');
            this.router.navigate(['/']);
          }
        });
    }
  }
}
