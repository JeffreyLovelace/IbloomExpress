import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ConductorComponent } from './conductor/conductor.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { TipoNegocioComponent } from './tipo-negocio/tipo-negocio.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { ModificarClientesComponent } from './modificar-clientes/modificar-clientes.component';
import { ModificarConductorComponent } from './modificar-conductor/modificar-conductor.component';
import { ModificarPedidoComponent } from './modificar-pedido/modificar-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DriversComponent } from './drivers/drivers.component';
import { ComerciosComponent } from './comercios/comercios.component';
import { ModificarRestauranteComponent } from './modificar-restaurante/modificar-restaurante.component';
import { ModificarAdministradorComponent } from './modificar-administrador/modificar-administrador.component';
import { PedidosHistoricoComponent } from './pedidos-historico/pedidos-historico.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'conductor', component: ConductorComponent},
  { path: 'restaurant', component: RestaurantComponent},
  { path: 'administrador', component: AdministradorComponent},
  { path: 'tipoNegocio', component: TipoNegocioComponent},
  { path: 'publicaciones', component: PublicacionesComponent},
  { path: 'modificarClientes/:id', component: ModificarClientesComponent},
  { path: 'modificarConductor/:id', component: ModificarConductorComponent},
  { path: 'modificarrestaurant/:id', component: ModificarRestauranteComponent},
  { path: 'modificarAdministrador/:id', component: ModificarAdministradorComponent},
  { path: 'modificarPedido/:id', component: ModificarPedidoComponent},
  { path: 'pedidos', component: PedidosComponent},
  { path: 'comercios', component: DriversComponent},  
  { path: 'drivers', component: ComerciosComponent},
  { path: 'pedidosHistorico', component: PedidosHistoricoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
