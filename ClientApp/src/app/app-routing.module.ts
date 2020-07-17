import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "ubicacion",
    loadChildren: () =>
      import("./pages/ubicacion/ubicacion.module").then(
        (m) => m.UbicacionPageModule
      ),
  },
  {
    path: "registro",
    loadChildren: () =>
      import("./pages/registro/registro.module").then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: "inicio",
    loadChildren: () =>
      import("./pages/inicio/inicio.module").then((m) => m.InicioPageModule),
  },
  {
    path: 'comercios',
    loadChildren: () => import('./pages/comercios/comercios.module').then( m => m.ComerciosPageModule)
  },
  {
    path: 'platos',
    loadChildren: () => import('./pages/platos/platos.module').then( m => m.PlatosPageModule)
  },
  {
    path: 'detalleproducto',
    loadChildren: () => import('./pages/detalleproducto/detalleproducto.module').then( m => m.DetalleproductoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'detallecomercio',
    loadChildren: () => import('./pages/detallecomercio/detallecomercio.module').then( m => m.DetallecomercioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
