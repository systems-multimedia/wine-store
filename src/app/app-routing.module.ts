import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LicoresComponent } from './components/licores/licores.component';
import { EmbutidosComponent } from './components/embutidos/embutidos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: NavBarComponent, data: { title: 'Wine Store' }, children: [
      { path: 'home', component: HomeComponent, data: { title: 'Home' }, pathMatch: 'full' },
      // { path: 'product/licores', component: LicoresComponent, data: { title: 'Licores' }, pathMatch: 'full' },
      // { path: 'products/embutidos', component: EmbutidosComponent, data: { title: 'Embutidos' } },
      { path: 'products/:kind', component: ProductosComponent, data: { title: 'Embutidos' } },
      { path: 'products/:kind/id/:id', component: ProductoComponent, data: { title: ':kind' } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
