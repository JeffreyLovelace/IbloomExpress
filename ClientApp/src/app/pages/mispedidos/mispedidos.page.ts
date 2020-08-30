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
import { AuthService } from "../../services/auth.service";
import { ClienteService } from "../../services/cliente.service";
import { Pedido } from "../../interfaces/pedido";
import { Orden } from "../../interfaces/orden";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-mispedidos",
  templateUrl: "./mispedidos.page.html",
  styleUrls: ["./mispedidos.page.scss"],
})
export class MispedidosPage {
  pedidos: Pedido[];
  id_client;
  c = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private comercioService: ComercioService,
    private comboService: ComboService,
    private pedidoService: PedidoService,
    private ordenService: OrdenService,
    private location: Location,
    private authService: AuthService,
    private clienteService: ClienteService
  ) {}
  ionViewWillEnter() {
    this.getUser();
  }

  gePedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;
      });
    });
  }

  getUser() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.authService.getUser(res).subscribe((data) => {
        console.log(data);

        this.getCliente(data.email);
      });
    });
  }
  getCliente(correo) {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.clienteService.get(res).subscribe((data) => {
        for (let cliente of data) {
          if (cliente.correo == correo) {
            this.id_client = cliente.id;
            this.gePedido();
            this.getCantidad();
          }
        }
      });
    });
  }

  getCantidad() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;

        for (let pedido of this.pedidos) {
          if (pedido.id_cliente == this.id_client && pedido.id_estado == "1") {
            this.c = this.c + 1;
          }
        }
      });
    });
  }
}
