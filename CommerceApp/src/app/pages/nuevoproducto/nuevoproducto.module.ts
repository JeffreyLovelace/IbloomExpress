import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NuevoproductoPageRoutingModule } from "./nuevoproducto-routing.module";

import { NuevoproductoPage } from "./nuevoproducto.page";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevoproductoPageRoutingModule,
  ],
  declarations: [NuevoproductoPage],
})
export class NuevoproductoPageModule {}
