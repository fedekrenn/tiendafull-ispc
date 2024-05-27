import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { DetailsComponent } from './components/customer-dashboard/details/details.component';
import { HistorialComponent } from './components/customer-dashboard/historial/historial.component';
import { EnvioComponent } from './components/customer-dashboard/envio/envio.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

export const routes: Routes = [
  { path: 'inicio', component: LandingPageComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'productos/:id', component: ProductDetailComponent },
  { path: 'inicio-sesion', component: LoginPageComponent },
  {
    path: 'panel-de-control',
    component: CustomerDashboardComponent,
    children: [
      { path: 'detalles', component: DetailsComponent },
      { path: 'historial', component: HistorialComponent },
      { path: 'envio', component: EnvioComponent },
    ],
  },
  { path: 'registro', component: RegisterComponent },
  { path: 'recuperar-contraseña', component: RecoverPasswordComponent },
  { path: 'contacto', component: ContactPageComponent },
  { path: 'acerca-de-nosotros', component: AboutUsComponent },
  { path: 'carrito', component: CartPageComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];
