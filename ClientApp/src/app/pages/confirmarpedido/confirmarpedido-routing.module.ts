import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarpedidoPage } from './confirmarpedido.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarpedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarpedidoPageRoutingModule {}
