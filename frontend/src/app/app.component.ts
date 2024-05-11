import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GaleriaProductosComponent } from './components/galeria-productos/galeria-productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, GaleriaProductosComponent,LoginPageComponent, ProductoComponent, LandingPageComponent, RegistroComponent,CustomerDashboardComponent, ContactPageComponent ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
