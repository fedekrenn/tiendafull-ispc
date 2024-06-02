import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        first_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(45),
          ],
        ],
        nro_documento: [
          '',
          [
            Validators.required,
            Validators.compose([
              Validators.min(1000000),
              Validators.max(99999999),
            ]),
          ],
        ],
        telefono: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        password1: [
          '',
          [
            Validators.required,
            Validators.compose([
              Validators.minLength(6),
              Validators.maxLength(20),
            ]),
          ],
        ],
        password2: [
          '',
          [
            Validators.required,
            Validators.compose([
              Validators.minLength(6),
              Validators.maxLength(20),
            ]),
          ],
        ],
      },
      { validators: this.notEqualPasswordValidator() }
    );
  }

  get username() {
    return this.form.get('username');
  }

  get first_name() {
    return this.form.get('first_name');
  }

  get last_name() {
    return this.form.get('last_name');
  }

  get nro_documento() {
    return this.form.get('nro_documento');
  }

  get telefono() {
    return this.form.get('telefono');
  }

  get email() {
    return this.form.get('email');
  }

  get password1() {
    return this.form.get('password1');
  }

  get password2() {
    return this.form.get('password2');
  }

  notEqualPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get('password1');
      const pass2 = control.get('password2');

      return pass1 && pass2 && pass1.value !== pass2.value
        ? { notEqualPassword: true }
        : null;
    };
  }

  onEnviar(event: Event): void {
    event.preventDefault;
    if (this.form.valid) {
      const newUser = {
        username: this.form.value.username,
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name,
        nro_documento: this.form.value.nro_documento,
        telefono: this.form.value.telefono,
        email: this.form.value.email,
        password: this.form.value.password1,
      };

      this.authService.register(newUser).subscribe({
        next: (res) => {
          if (res.token) {
            alert('Usuario registrado');
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          alert('Error al registrar usuario, por favor intenta de nuevo');
          console.error(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
