import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateComboPageRoutingModule } from './update-combo-routing.module';

import { UpdateComboPage } from './update-combo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateComboPageRoutingModule
  ],
  declarations: [UpdateComboPage]
})
export class UpdateComboPageModule {}
