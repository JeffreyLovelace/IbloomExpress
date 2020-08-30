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
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { OrdenService } from "../../services/orden.service";
import { AlertController } from "@ionic/angular";

import { Comercio } from "../../interfaces/comercio";
import { Orden } from "../../interfaces/orden";
declare var google: any;

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-confirmarpedido",
  templateUrl: "./confirmarpedido.page.html",
  styleUrls: ["./confirmarpedido.page.scss"],
})
export class ConfirmarpedidoPage {
  servidor = environment.url;
  lattitude;
  longitude;
  id;
  nit = null;
  razonSocial = null;
  nota = null;
  tokenpedido = null;
  pedido1 = {
    id_cliente: null,
    id_estado: null,
    latitud: null,
    longitud: null,
    nit: null,
    razonSocial: null,
    total: null,
    nota: null,
    tiempoDelivery: null,
  };
  id_pedido;
  logo;
  telefono;
  nombre;
  velocidad = 8;
  km;
  extra;
  tiempo;
  fotoLogo;
  fotoBaner;
  envio;
  lattitudec;
  longitudec;
  direccion;
  referencia;
  precioMinimo;
  total;
  desc;
  idcomercio;
  comercios: Comercio[];
  totalDelivery;
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
    private alertController: AlertController,
    private fcm: FCM
  ) {
    this.getDetalleNegocio();
    this.storage.get("lattitude").then((val) => {
      this.lattitude = val;
    });
    this.storage.get("longitude").then((val) => {
      this.longitude = val;
    });
    this.fcm.getToken().then((token) => {
      console.log(token);
      this.tokenpedido = token;
    });
    this.total = this.activatedRoute.snapshot.params["total"];
    this.idcomercio = this.activatedRoute.snapshot.params["id"];
  }

  getDetalleNegocio() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService
        .detalle(res, this.idcomercio)
        .subscribe((data: Comercio[]) => {
          this.comercios = data;
          this.telefono = this.comercios[0].telefono;
          this.nombre = this.comercios[0].nombre;
          this.fotoLogo = this.comercios[0].fotoLogo;
          this.fotoBaner = this.comercios[0].fotoBaner;
          this.envio = this.comercios[0].envio;
          this.direccion = this.comercios[0].direccion;
          this.referencia = this.comercios[0].referencia;
          this.precioMinimo = this.comercios[0].precioMinimo;

          this.lattitudec = this.comercios[0].latitud;
          this.longitudec = this.comercios[0].longitud;
          this.calculateDistance(
            this.lattitude,
            this.longitude,
            this.lattitudec,
            this.longitudec
          );
        });
      console.log(this.nombre);
      console.log(this.comercios);
    });
  }
  verificarCantidad() {}
  pedido(id) {
    this.pedido1 = {
      id_cliente: id,
      id_estado: 1,
      latitud: this.lattitude,
      longitud: this.longitude,
      nit: this.nit,
      razonSocial: this.razonSocial,
      total: this.total,
      nota: this.desc,
      tiempoDelivery: this.tiempo,
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
        console.log(data.email);
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
    if (this.km <= 2) {
      this.envioTotal = this.envio * 1;
    }
    if (this.km > 2 && this.km <= 4) {
      this.envioTotal = this.envio * 1.5;
    }
    if (this.km > 4 && this.km <= 6) {
      this.envioTotal = this.envio * 2;
    }
    if (this.km > 6 && this.km <= 8) {
      this.envioTotal = this.envio * 3.5;
    }
    if (this.km > 8) {
      this.envioTotal = this.envio * 5;
    }
    this.totalDelivery = Number(this.total) + Number(this.envioTotal);
  }
  envioTotal;
  async presentAlert() {
    this.pedidoService.notification().subscribe((res) => {
      console.log(res);
    });

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
    this.pedidoService.notification();
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
