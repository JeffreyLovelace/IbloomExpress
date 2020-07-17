import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoproductoPage } from './nuevoproducto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoproductoPageRoutingModule {}
