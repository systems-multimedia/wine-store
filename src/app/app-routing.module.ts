import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserGuard } from './auth/user.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: NavBarComponent, data: { title: 'Wine Store' }, children: [
      { path: 'home', component: HomeComponent, data: { title: 'Home' }, pathMatch: 'full' },
      { path: 'products/checkout', component: CheckoutComponent, data: { title: 'Checkout' } },
      { path: 'products/:kind', component: ProductosComponent, data: { title: ':kind' } },
      { path: 'products/:kind/id/:id', component: ProductoComponent, data: { title: ':kind' } },
      { path: 'products/:range/search/:name', component: SearchComponent, data: { title: 'Búsqueda :name' } },
      { path: 'my-profile/user/:id', component: ProfileComponent, data: { title: 'Perfil' }, canActivate: [UserGuard] },
    ]
  },
  { path: 'login', component: LoginComponent, data: { title: 'Inicio de Sesión' } },
  { path: '**', component: NotFoundComponent, data: { title: '404 | Error' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
