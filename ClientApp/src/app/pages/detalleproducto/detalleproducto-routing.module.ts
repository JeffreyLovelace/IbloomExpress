import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleproductoPage } from './detalleproducto.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleproductoPageRoutingModule {}
