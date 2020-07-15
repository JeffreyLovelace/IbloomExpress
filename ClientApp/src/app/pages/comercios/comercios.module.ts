import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComerciosPageRoutingModule } from './comercios-routing.module';

import { ComerciosPage } from './comercios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComerciosPageRoutingModule
  ],
  declarations: [ComerciosPage]
})
export class ComerciosPageModule {}
