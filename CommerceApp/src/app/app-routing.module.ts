import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
const routes: Routes = [
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },

  {
    path: "historial",
    loadChildren: () =>
      import("./pages/historial/historial.module").then(
        (m) => m.HistorialPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "nuevoproducto",
    loadChildren: () =>
      import("./pages/nuevoproducto/nuevoproducto.module").then(
        (m) => m.NuevoproductoPageModule
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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
