import {Component} from '@angular/core';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form!:FormGroup
  contador:number = 0
  usuarioAdmin:string = 'admin@admin.com'
  passAdmin:string = 'admin'  
  constructor(private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      email:['',[Validators.required, Validators.email],[]],
      password:['',[Validators.required],[]]
    })
  }
  get Password() {
    return this.form.get("password");
  }
  get Email() {
    return this.form.get("email");
  }


  validarUsuario() {
    if (this.form.value.email != "" && this.form.value.password != "") {
      this.contador = this.contador + 1;
      if (this.contador < 3) {
        if (this.form.value.email == this.usuarioAdmin) {
          if (this.form.value.password == this.passAdmin) {
            alert ("Bienvenido "  + this.form.value.email)
            window.location.href = "../index.html";
          } else {
            alert("Contraseña incorrecta");
          }
        } else {
          alert("Correo electrónico incorrecto");
        }
      } else {
        alert("Usuario bloqueado");
      }
    }
  }
}

