import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoproductoPageRoutingModule } from './nuevoproducto-routing.module';

import { NuevoproductoPage } from './nuevoproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoproductoPageRoutingModule
  ],
  declarations: [NuevoproductoPage]
})
export class NuevoproductoPageModule {}
