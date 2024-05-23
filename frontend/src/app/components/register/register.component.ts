import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  profileForm = this.formBuilder.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.compose([
            Validators.min(1000000),
            Validators.max(99999999),
          ]),
        ],
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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

  get nombre() {
    return this.profileForm.get('nombre');
  }

  get apellido() {
    return this.profileForm.get('apellido');
  }

  get dni() {
    return this.profileForm.get('dni');
  }

  get telefono() {
    return this.profileForm.get('telefono');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password1() {
    return this.profileForm.get('password1');
  }

  get password2() {
    return this.profileForm.get('password2');
  }

  constructor(private formBuilder: FormBuilder) {}

  notEqualPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get('password1');
      const pass2 = control.get('password2');

      return pass1 && pass2 && pass1.value !== pass2.value
        ? { notEqualPassword: true }
        : null;
    };
  }

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.profileForm.valid) {
      alert('Los datos fueron enviados');
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
