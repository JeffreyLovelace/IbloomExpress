import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenPageRoutingModule } from './orden-routing.module';

import { OrdenPage } from './orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenPageRoutingModule
  ],
  declarations: [OrdenPage]
})
export class OrdenPageModule {}
