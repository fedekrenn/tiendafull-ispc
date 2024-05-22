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

export const routes: Routes = [
  { path: 'Home', component: LandingPageComponent },
  { path: 'Productos', component: ProductsComponent },
  { path: 'Productos/:id', component: ProductDetailComponent },
  { path: 'Login', component: LoginPageComponent },
  { path: 'Dashboard', component: CustomerDashboardComponent, children:[
    { path: 'Detalles', component: DetailsComponent },
    { path: 'Historial', component: HistorialComponent },
    { path: 'Envio', component: EnvioComponent },
  ] },
  { path: 'Registro', component: RegisterComponent },
  { path: 'RecoverPass', component: RecoverPasswordComponent },
  { path: 'Contact', component: ContactPageComponent },
  { path: 'Nosotros', component: AboutUsComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];
