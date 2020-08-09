import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenPage } from './orden.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenPageRoutingModule {}
