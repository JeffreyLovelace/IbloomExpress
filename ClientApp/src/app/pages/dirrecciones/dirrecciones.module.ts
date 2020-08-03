import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirreccionesPageRoutingModule } from './dirrecciones-routing.module';

import { DirreccionesPage } from './dirrecciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirreccionesPageRoutingModule
  ],
  declarations: [DirreccionesPage]
})
export class DirreccionesPageModule {}
