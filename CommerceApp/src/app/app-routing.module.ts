import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },

  {
    path: "historial",
    loadChildren: () =>
      import("./pages/historial/historial.module").then(
        (m) => m.HistorialPageModule
      ),
  },
  {
    path: "nuevoproducto",
    loadChildren: () =>
      import("./pages/nuevoproducto/nuevoproducto.module").then(
        (m) => m.NuevoproductoPageModule
      ),
  },
  {
    path: "detallepedido",
    loadChildren: () =>
      import("./pages/detallepedido/detallepedido.module").then(
        (m) => m.DetallepedidoPageModule
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
