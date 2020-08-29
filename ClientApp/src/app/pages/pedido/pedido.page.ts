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
import { Comercio } from "../../interfaces/comercio";
declare var google: any;

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
  comercios: Comercio[];
  pedidos: Pedido[];
  servidor = environment.url;
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
    cantidad: null,
  };
  lattitude;
  longitude;
  lattitudec;
  longitudec;
  km;
  minimo;
  tiempo;
  extra;
  sumarOrden = 0;
  velocidad = 8;
  total1;
  idcomercio;
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
    this.storage.get("lattitude").then((val) => {
      this.lattitude = val;
    });
    this.storage.get("longitude").then((val) => {
      this.longitude = val;
    });
  }

  idpedido;
  getOrden() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.get(res).subscribe((data: Orden[]) => {
        this.ordenes = data;
        console.log(this.ordenes);

        for (let orden of this.ordenes) {
          if (orden.id_pedido == this.id_pedido) {
            console.log("id pedido de orden" + this.id_pedido);
            this.idpedido = this.id_pedido;
            this.sumarOrden =
              this.sumarOrden + Number(orden.cantidad) * Number(orden.precio);

            console.log("id pedido of" + this.idpedido);
            this.getPedido(this.idpedido);
          }
        }
      });
    });
  }
  getPedido(idpedido) {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.detalle(res, idpedido).subscribe((data: Pedido[]) => {
        console.log("id pedido de pedido " + this.id_pedido);

        this.pedidos = data;
        this.idcomercio = this.pedidos[0].id_comercio;
        this.getDetalleNegocio(this.idcomercio);
        console.log("id comercios" + this.idcomercio);
        console.log(this.pedidos);
      });
    });
  }
  getDetalleNegocio(id) {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.detalle(res, id).subscribe((data: Comercio[]) => {
        this.comercios = data;
        this.minimo = this.comercios[0].precioMinimo;
        this.lattitudec = this.comercios[0].latitud;
        this.longitudec = this.comercios[0].longitud;
        this.calculateDistance(
          this.lattitude,
          this.longitude,
          this.lattitudec,
          this.longitudec
        );
        console.log(this.ordenes);
      });
    });
  }
  caculateTotal(ordenes) {}
  increment(id, precio1) {
    precio1++;
    this.orden1 = {
      cantidad: precio1,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.edit(this.orden1, res, id).subscribe((res) => {
        console.log(res);
        this.getDetallePedido();
      });
    });

    //  this.total = this.currentNumber * this.precio;
  }

  decrement(id, precio1) {
    precio1--;
    this.orden1 = {
      cantidad: precio1,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.edit(this.orden1, res, id).subscribe((res) => {
        console.log(res);
        this.getDetallePedido();
      });
    });
  }
  confirmar() {
    this.storage.remove("pedido").then(() => {
      // this.router.navigateByUrl("/login");
      console.log("pedido confirmado");
    });
  }
  getDetallePedido() {}
  updatePedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService
        .edit(this.pedido1, res, this.id_pedido)
        .subscribe((res) => {
          console.log(res);
          this.getDetallePedido();
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
  calculateDistance(lat1, ln1, lat2, lng2) {
    console.log(lat1, ln1);
    console.log(lat2, lng2);

    var gps1 = new google.maps.LatLng(Number(lat1), Number(ln1));
    var gps2 = new google.maps.LatLng(Number(lat2), Number(lng2));

    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      gps1,
      gps2
    );

    this.km = distance / 1000;
    this.tiempo = Math.round((this.km / this.velocidad) * 60);
    this.extra = this.tiempo + 10;
  }
}
