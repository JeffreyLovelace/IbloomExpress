import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallecomercioPage } from './detallecomercio.page';

const routes: Routes = [
  {
    path: '',
    component: DetallecomercioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallecomercioPageRoutingModule {}
