import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallecomercioPageRoutingModule } from './detallecomercio-routing.module';

import { DetallecomercioPage } from './detallecomercio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallecomercioPageRoutingModule
  ],
  declarations: [DetallecomercioPage]
})
export class DetallecomercioPageModule {}
