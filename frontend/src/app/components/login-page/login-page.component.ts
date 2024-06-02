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
  contador: number = 1;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required], []],
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  validarUsuario() {
    if (this.form.value.username != '' && this.form.value.password != '') {
      const logUser = {
        username: this.form.value.username,
        password: this.form.value.password,
      };

      if (this.contador < 3) {
        this.authService.login(logUser).subscribe({
          next: (res) => {
            if (res.token) {
              alert('Bienvenido ' + res.user.email);
              this.router.navigate(['/productos']);
              this.contador = 0;
            }
          },
          error: (error) => {
            alert(
              'Error al iniciar sesión. Intento ' + this.contador + ' de 3'
            );
            console.error(error);
            this.contador++;
          },
        });
      } else {
        alert('Usuario bloqueado');
      }
    }
  }
}
