import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Combo } from "../../interfaces/combo";
import { ComboService } from "../../services/combo.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ComercioService } from "../../services/comercio.service";
import { PedidoService } from "../../services/pedido.service";

import { OrdenService } from "../../services/orden.service";

import { Pedido } from "../../interfaces/pedido";
import { Orden } from "../../interfaces/orden";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-detalleproducto",
  templateUrl: "./detalleproducto.page.html",
  styleUrls: ["./detalleproducto.page.scss"],
})
export class DetalleproductoPage {
  currentNumber = 1;
  id = null;
  combos: Combo[];
  pedido1;
  precio;
  total;
  descripcion;
  orden1 = {
    id_combo: null,
    id_pedido: null,
    precio: null,
    nombre: null,
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private comercioService: ComercioService,
    private comboService: ComboService,
    private pedidoService: PedidoService,
    private ordenService: OrdenService
  ) {
    this.getCombo();
    this.id = this.activatedRoute.snapshot.params["id"];
  }
  getCombo() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comboService.detail(res, this.id).subscribe((data: Combo[]) => {
        this.combos = data;
        this.precio = this.combos[0].precio;
        console.log(this.combos);
      });
    });
  }
  pedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.save(res, this.pedido1).subscribe((res) => {
        this.orden();
        console.log(res);
      });
    });
  }
  orden() {
    this.orden1 = {
      id_combo: this.id,
      id_pedido: null,
      precio: this.currentNumber,
      nombre: this.descripcion,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.save(this.orden1, res).subscribe((res) => {
        console.log(res);
      });
    });
  }

  increment() {
    this.total = this.currentNumber * this.precio;
    this.currentNumber++;
  }

  decrement() {
    this.total = this.currentNumber * this.precio;
    this.currentNumber--;
  }
}
