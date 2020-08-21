import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateComboPage } from './update-combo.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateComboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateComboPageRoutingModule {}
