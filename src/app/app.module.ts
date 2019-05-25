import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserServiceService } from './service/user-service.service';
import { ProductService } from './service/product.service';
import { LicoresComponent } from './components/licores/licores.component';
import { EmbutidosComponent } from './components/embutidos/embutidos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    LicoresComponent,
    EmbutidosComponent,
    ProductoComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserServiceService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
