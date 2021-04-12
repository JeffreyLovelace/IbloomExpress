import { Component, OnInit } from "@angular/core";
import { Combo } from "../interfaces/combo";
import { Pedido } from "../interfaces/pedido";

import { ComercioService } from "../services/comercio.service";
import { PedidoService } from "../services/pedidos.service";
import { AlertController } from "@ionic/angular";

import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  correo;
  idcomercio;
  id;
  pedidos: Pedido[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private authService: AuthService,
    private storage: Storage,
    private pedidoService: PedidoService,
    public alertController: AlertController
  ) {}
  ionViewWillEnter() {
    this.getUser();
  }
  getUser() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.authService.getUser(res).subscribe((response) => {
        this.correo = response.email;
        this.get();
      });
    });
  }
  get() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data) => {
        for (let datos of data) {
          if (datos.correo == this.correo) {
            this.idcomercio = datos.id;

            this.getPedido();
          }
        }
      });
    });
  }
  doRefresh(event) {
    this.getUser();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  getPedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Nuevo pedido!",
      message: "Message <strong>text</strong>!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
          },
        },
      ],
    });

    await alert.present();
  }
}
