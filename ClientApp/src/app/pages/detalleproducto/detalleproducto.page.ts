import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Combo } from "../../interfaces/combo";
import { ComboService } from "../../services/combo.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ComercioService } from "../../services/comercio.service";
import { PedidoService } from "../../services/pedido.service";
import { Location } from "@angular/common";

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
  pedido1 = { estadoEliminado: "1", id_comercio: null };
  precio;
  total;
  descripcion;
  id_comercio;
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
    private ordenService: OrdenService,
    private location: Location
  ) {
    this.getCombo();

    this.id = this.activatedRoute.snapshot.params["id"];
  }
  verificar() {
    this.storage.get("pedido").then((val) => {
      if (val) {
        console.log(val);
        this.orden(val);
      } else {
        console.log("no existe");
        this.pedido();
      }
    });
  }
  getCombo() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comboService.detail(res, this.id).subscribe((data: Combo[]) => {
        this.combos = data;
        this.id_comercio = this.combos[0].id_comercio;
        this.precio = this.combos[0].precio;
        this.total = this.currentNumber * this.precio;
        console.log(this.combos);
      });
    });
  }
  pedido() {
    this.pedido1 = { estadoEliminado: "1", id_comercio: this.id_comercio };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.save(res, this.pedido1).subscribe((res) => {
        this.orden(res.id);
        this.storage.set("pedido", res.id);
      });
    });
  }
  orden(val) {
    this.orden1 = {
      id_combo: this.id,
      id_pedido: val,
      precio: this.currentNumber,
      nombre: this.descripcion,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.save(this.orden1, res).subscribe((res) => {
        console.log(res);
        this.backClicked();
      });
    });
  }

  increment() {
    this.currentNumber++;
    this.total = this.currentNumber * this.precio;
  }

  decrement() {
    this.currentNumber--;
    this.total = this.currentNumber * this.precio;
  }
  backClicked() {
    this.location.back();
  }
}
