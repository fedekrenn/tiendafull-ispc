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
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LogoutPageComponent } from './components/logout-page/logout-page.component';
import { IngresarProductosComponent } from './components/ingresar-productos/ingresar-productos.component';
import { authGuard, loginGuard } from './auth.guard';
export const routes: Routes = [
  { path: 'inicio', component: LandingPageComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'productos/:id', component: ProductDetailComponent },
  { path: 'inicio-sesion', component: LoginPageComponent },
  { path: 'panel-de-control', component: CustomerDashboardComponent, canActivate: [loginGuard] },
  { path: 'registro', component: RegisterComponent },
  { path: 'logout', component: LogoutPageComponent, canActivate: [loginGuard] },
  { path: 'recuperar-contraseña', component: RecoverPasswordComponent },
  { path: 'contacto', component: ContactPageComponent },
  { path: 'acerca-de-nosotros', component: AboutUsComponent },
  { path: 'carrito', component: CartPageComponent, canActivate: [loginGuard] },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];
