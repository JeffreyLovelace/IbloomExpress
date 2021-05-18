import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentInformationPage } from './payment-information.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentInformationPageRoutingModule {}
