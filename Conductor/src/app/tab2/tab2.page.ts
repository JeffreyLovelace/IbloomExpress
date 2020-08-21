import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Combo } from "../interfaces/combo";
import { ComboService } from "../services/combo.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";
import { ComercioService } from "../services/comercio.service";
import { PedidoService } from "../services/pedido.service";
import { Location } from "@angular/common";
import { AlertController } from "@ionic/angular";

import { OrdenService } from "../services/orden.service";
import { AuthService } from "../services/auth.service";
import { ClienteService } from "../services/cliente.service";
import { Pedido } from "../interfaces/pedido";
import { Orden } from "../interfaces/orden";
import { DriverService } from "../services/driver.service";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  pedidos: Pedido[];
  id_client;
  servidor = environment.url;
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
    private driverService: DriverService,
    private alertController: AlertController
  ) {}
  ionViewWillEnter() {
    this.getUser();
  }
  doRefresh(event) {
    this.getUser();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  gePedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;
        console.log(this.pedidos);
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
      this.driverService.get(res).subscribe((data) => {
        for (let cliente of data) {
          if (cliente.correo == correo) {
            this.id_client = cliente.id;
            console.log(this.id_client);
            this.gePedido();
          }
        }
        console.log(data);
      });
    });
  }
}
