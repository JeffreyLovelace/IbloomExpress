import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MispedidosPage } from './mispedidos.page';

const routes: Routes = [
  {
    path: '',
    component: MispedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MispedidosPageRoutingModule {}
