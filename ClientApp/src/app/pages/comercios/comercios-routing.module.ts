import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComerciosPage } from './comercios.page';

const routes: Routes = [
  {
    path: '',
    component: ComerciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComerciosPageRoutingModule {}
