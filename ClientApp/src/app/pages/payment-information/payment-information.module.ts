import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentInformationPageRoutingModule } from './payment-information-routing.module';

import { PaymentInformationPage } from './payment-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentInformationPageRoutingModule
  ],
  declarations: [PaymentInformationPage]
})
export class PaymentInformationPageModule {}
