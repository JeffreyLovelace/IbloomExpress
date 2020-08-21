import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirreccionesPage } from './dirrecciones.page';

const routes: Routes = [
  {
    path: '',
    component: DirreccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirreccionesPageRoutingModule {}
