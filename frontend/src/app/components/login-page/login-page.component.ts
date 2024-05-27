import { Component} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent{
  form!: FormGroup;
  contador: number = 0;
  
  constructor(private formBuilder: FormBuilder, private router: Router,private authService:AuthService) {
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
//      this.contador = this.contador + 1;
          const test = {
            username:"ferbarletta@gmail.com" ,
            email: this.form.value.email,
            password: this.form.value.password            
          }
          this.authService.login(test).subscribe(data =>{
            console.log(data)
          })          
    }
  }
}
