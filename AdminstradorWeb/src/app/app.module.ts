import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientesComponent } from './clientes/clientes.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConductorComponent } from './conductor/conductor.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { TipoNegocioComponent } from './tipo-negocio/tipo-negocio.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { ModificarClientesComponent } from './modificar-clientes/modificar-clientes.component';
import { ModificarConductorComponent } from './modificar-conductor/modificar-conductor.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AgmCoreModule } from '@agm/core';
import { ComerciosComponent } from './comercios/comercios.component';
import { DriversComponent } from './drivers/drivers.component';
import { ModificarRestauranteComponent } from './modificar-restaurante/modificar-restaurante.component';
import { ModificarAdministradorComponent } from './modificar-administrador/modificar-administrador.component';
import { ModificarPedidoComponent } from './modificar-pedido/modificar-pedido.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PedidosHistoricoComponent } from './pedidos-historico/pedidos-historico.component';
import { MouseEvent } from '@agm/core';
import { ModificarInformacionComponent } from './modificar-informacion/modificar-informacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientesComponent,
    MenuComponent,
    ConductorComponent,
    RestaurantComponent,
    AdministradorComponent,
    TipoNegocioComponent,
    PublicacionesComponent,
    ModificarClientesComponent,
    ModificarConductorComponent,
    PedidosComponent,
    FilterPipe,
    ComerciosComponent,
    DriversComponent,
    ModificarRestauranteComponent,
    ModificarAdministradorComponent,
    ModificarPedidoComponent,
    PedidosHistoricoComponent,
    ModificarInformacionComponent,
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule, 
    NgxPaginationModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase,"ibloomexpress"),
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyCjHc1rRLDNHyixAEyliT1nsE0UeqD-qrk'
      apiKey: 'AIzaSyBdHplvRp_f1m83P2JH6_DrYNJ8qXUfLPE'
      
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
