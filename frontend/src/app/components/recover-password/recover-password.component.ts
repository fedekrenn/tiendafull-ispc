import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recoverPassword() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      fetch("http://127.0.0.1:8000/api/recover-password/", {
        method:"POST", 
        headers:{"content-type":"application/json"},
        body:
            JSON.stringify({ // Convert the JavaScript object to a JSON string
            email: email,
        })
    })
      alert('Se ha enviado un correo a ' + email);
    }
  }
}
