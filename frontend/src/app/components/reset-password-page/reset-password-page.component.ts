import {Component} from '@angular/core';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-reset-password-page',
  imports: [ReactiveFormsModule ],
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent {
  form:FormGroup
  constructor(private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]]
    })
  }
  get Email() {
    return this.form.get("email");
  }

  resetPassword() {
    if (this.form.value.email != "") {
      // lógica para restablecer la contraseña
      alert ("Se ha enviado un correo electrónico de recuperación de contraseña a "  + this.form.value.email)
    } else {
      alert("Por favor, introduce un correo electrónico válido");
    }
  }
}
