import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    LoginPageComponent,
    ProductDetailComponent,
    LandingPageComponent,
    RegisterComponent,
    CustomerDashboardComponent,
    ContactPageComponent,
    AboutUsComponent,
  ],
  templateUrl: './app.component.html',
  styles: '',
})
export class AppComponent {}
