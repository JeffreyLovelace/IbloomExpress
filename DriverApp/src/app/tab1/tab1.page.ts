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

import { OrdenService } from "../services/orden.service";
import { AuthService } from "../services/auth.service";
import { ClienteService } from "../services/cliente.service";
import { DriverService } from "../services/driver.service";
import { AlertController } from "@ionic/angular";

import { Pedido } from "../interfaces/pedido";
import { Orden } from "../interfaces/orden";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  pedidos: Pedido[];
  id_client;
  pedido1 = {
    id_conductor: null,
    id_estado: null,
  };
  c = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private comercioService: ComercioService,
    private driverService: DriverService,
    private pedidoService: PedidoService,
    private ordenService: OrdenService,
    private location: Location,
    private authService: AuthService,
    private alertController: AlertController
  ) {}
  ionViewWillEnter() {
    this.gePedido();
    this.getUser();
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

  tomarPedido(pedido_id) {
    console.log("id pedido " + pedido_id + "this.id_client " + this.id_client);

    this.pedido1 = {
      id_conductor: this.id_client,
      id_estado: 3,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.edit(this.pedido1, res, pedido_id).subscribe(
        (data) => this.presentAlert(),
        (error) => this.presentAlertError()
      );
    });
  }
  async presentAlertConfirm(pedido_id) {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "¿Quiere tomar este pedido?",

      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Si",
          handler: () => {
            this.tomarPedido(pedido_id);
          },
        },
      ],
    });

    await alert.present();
  }
  async presentAlert() {
    this.router.navigateByUrl("/tabs/tab2");

    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Exito",
      message: "El pedido fue asignado a su persona",
      buttons: ["OK"],
    });

    await alert.present();
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Algo salió mal :(",
      message: "Intente de nuevo",
      buttons: ["OK"],
    });
    this.gePedido();
    await alert.present();
  }
}
