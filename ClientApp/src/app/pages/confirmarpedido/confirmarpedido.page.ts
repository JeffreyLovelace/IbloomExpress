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
import { AuthService } from "../../services/auth.service";
import { ClienteService } from "../../services/cliente.service";

import { OrdenService } from "../../services/orden.service";
import { AlertController } from "@ionic/angular";

import { Pedido } from "../../interfaces/pedido";
import { Orden } from "../../interfaces/orden";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-confirmarpedido",
  templateUrl: "./confirmarpedido.page.html",
  styleUrls: ["./confirmarpedido.page.scss"],
})
export class ConfirmarpedidoPage {
  lattitude;
  longitude;
  id;
  nit = null;
  razonSocial = null;
  nota = null;
  pedido1 = {
    id_cliente: null,
    id_estado: null,
    latitud: null,
    longitud: null,
    nit: null,
    razonSocial: null,
    total: null,
  };
  id_pedido;
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
    private clienteService: ClienteService,
    private alertController: AlertController
  ) {
    this.storage.get("lattitude").then((val) => {
      this.lattitude = val;
    });
    this.storage.get("longitude").then((val) => {
      this.longitude = val;
    });
  }

  pedido(id) {
    this.pedido1 = {
      id_cliente: id,
      id_estado: 1,
      latitud: this.lattitude,
      longitud: this.longitude,
      nit: this.nit,
      razonSocial: this.razonSocial,
      total: null,
    };

    this.storage.get("pedido").then((val) => {
      this.id_pedido = val;
    });
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.edit(this.pedido1, res, this.id_pedido).subscribe(
        (data) => this.presentAlert(),
        (error) => this.presentAlertError()
      );
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
            this.pedido(cliente.id);
          }
        }
        console.log(data);
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",

      message: "Desea confirmar el pedido?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Aceptar",
          handler: () => {
            this.getUser();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert() {
    this.storage.remove("pedido").then(() => {
      this.router.navigateByUrl("/inicio");
      console.log("pedido confirmado");
    });
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Exito!",
      message:
        "Su pedido se registro correctamente. Nos pondremos en contacto cuando el pedido este en su puerta. También, puede observar el estado del pedido en el carrito de compras. ",
      buttons: ["OK"],
    });

    await alert.present();
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Algo salió mal :(",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
