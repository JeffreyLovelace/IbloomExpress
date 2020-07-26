import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarpedidoPageRoutingModule } from './confirmarpedido-routing.module';

import { ConfirmarpedidoPage } from './confirmarpedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarpedidoPageRoutingModule
  ],
  declarations: [ConfirmarpedidoPage]
})
export class ConfirmarpedidoPageModule {}
