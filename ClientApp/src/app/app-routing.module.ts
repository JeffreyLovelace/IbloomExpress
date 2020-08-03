import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "inicio",
    loadChildren: () =>
      import("./pages/inicio/inicio.module").then((m) => m.InicioPageModule),
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },

  {
    path: "registro",
    loadChildren: () =>
      import("./pages/registro/registro.module").then(
        (m) => m.RegistroPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "inicio",
    loadChildren: () =>
      import("./pages/inicio/inicio.module").then((m) => m.InicioPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "comercios/:id/:nombre",
    loadChildren: () =>
      import("./pages/comercios/comercios.module").then(
        (m) => m.ComerciosPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path:
      "platos/:id/:nombre/:fotoLogo/:fotoBaner/:envio/:precioMinimo/:latitud/:longitud",
    loadChildren: () =>
      import("./pages/platos/platos.module").then((m) => m.PlatosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "detalleproducto/:id",
    loadChildren: () =>
      import("./pages/detalleproducto/detalleproducto.module").then(
        (m) => m.DetalleproductoPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "carrito",
    loadChildren: () =>
      import("./pages/carrito/carrito.module").then((m) => m.CarritoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "pedido",
    loadChildren: () =>
      import("./pages/pedido/pedido.module").then((m) => m.PedidoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "detallecomercio/:id",
    loadChildren: () =>
      import("./pages/detallecomercio/detallecomercio.module").then(
        (m) => m.DetallecomercioPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("./pages/perfil/perfil.module").then((m) => m.PerfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "confirmarpedido",
    loadChildren: () =>
      import("./pages/confirmarpedido/confirmarpedido.module").then(
        (m) => m.ConfirmarpedidoPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "detallepedido/:id",
    loadChildren: () =>
      import("./pages/detallepedido/detallepedido.module").then(
        (m) => m.DetallepedidoPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "orden/:id",
    loadChildren: () =>
      import("./pages/orden/orden.module").then((m) => m.OrdenPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "dirrecciones",
    loadChildren: () =>
      import("./pages/dirrecciones/dirrecciones.module").then(
        (m) => m.DirreccionesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
