import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Combo } from "../../interfaces/combo";
import { ComboService } from "../../services/combo.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ComercioService } from "../../services/comercio.service";
import { PedidoService } from "../../services/pedido.service";
import { ModalController } from "@ionic/angular";
import { OrdenService } from "../../services/orden.service";

import { Pedido } from "../../interfaces/pedido";
import { Orden } from "../../interfaces/orden";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.page.html",
  styleUrls: ["./pedido.page.scss"],
})
export class PedidoPage {
  currentNumber = 1;
  id = null;
  combos: Combo[];
  ordenes: Orden[];
  pedido1 = {
    id_cliente: null,
    id_estado: null,
    latitud: null,
    longitud: null,
    nit: null,
    razonSocial: null,
    total: null,
    estadoEliminado: 1,
  };
  precio;
  total;
  descripcion;
  id_pedido;
  orden1 = {
    precio: null,
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private comercioService: ComercioService,
    private comboService: ComboService,
    private pedidoService: PedidoService,
    private ordenService: OrdenService,
    private modalController: ModalController
  ) {
    this.getOrden();
    this.storage.get("pedido").then((val) => {
      this.id_pedido = val;
    });
  }

  getOrden() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.get(res).subscribe((data: Orden[]) => {
        this.ordenes = data;

        console.log(this.ordenes);
      });
    });
  }

  increment(id, precio1) {
    precio1++;
    this.orden1 = {
      precio: precio1,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.edit(this.orden1, res, id).subscribe((res) => {
        console.log(res);
        this.getOrden();
      });
    });

    //  this.total = this.currentNumber * this.precio;
  }

  decrement(id, precio1) {
    precio1--;
    this.orden1 = {
      precio: precio1,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.edit(this.orden1, res, id).subscribe((res) => {
        console.log(res);
        this.getOrden();
      });
    });
  }
  confirmar() {
    this.storage.remove("pedido").then(() => {
      // this.router.navigateByUrl("/login");
      console.log("pedido confirmado");
    });
  }
  updatePedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService
        .edit(this.pedido1, res, this.id_pedido)
        .subscribe((res) => {
          console.log(res);
          this.getOrden();
        });
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
