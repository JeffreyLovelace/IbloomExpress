import { Component } from "@angular/core";
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from "@ionic-native/background-geolocation/ngx";
import { IonSlides } from "@ionic/angular";
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
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  pedidos: Pedido[];
  id_client;
  estado;
  public tracking: boolean;

  pedido1 = {
    id_conductor: null,
    id_estado: null,
  };
  driverStatus = {
    estadoTrabajo: null,
  };
  entrega;
  c = 0;
  logs: string[] = [];
  myValue = false;
  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
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

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
  ionViewWillEnter() {
    this.gePedido();
    this.getUser();
  }

  startBackgroundGeolocation() {
    this.backgroundGeolocation.isLocationEnabled().then((rta) => {
      if (rta) {
        this.start();
      } else {
        this.backgroundGeolocation.showLocationSettings();
      }
    });
  }

  start() {
    this.tracking = true;

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true,
      stopOnTerminate: false,
      // Android only section
      locationProvider: 1,
      startForeground: true,
      interval: 6000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
    };

    console.log("start");
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          this.logs.push(`${location.latitude},${location.longitude}`);
        });
    });

    // start recording location
    this.backgroundGeolocation.start();
  }

  stopBackgroundGeolocation() {
    this.tracking = false;
    this.backgroundGeolocation.stop();
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
            if (cliente.estadoTrabajo == 1) {
              this.tracking = true;
            } else {
              this.tracking = false;
            }
            this.estado = cliente.estadoTrabajo;
            console.log(this.id_client);
            this.gePedido();
          }
        }
        console.log(data);
      });
    });
  }
  updateStatusActive() {
    console.log(this.estado);
    this.driverStatus = {
      estadoTrabajo: 1,
    };

    this.storage.get(TOKEN_KEY).then((res) => {
      this.driverService
        .update(res, this.driverStatus, this.id_client)
        .subscribe((data) => {
          console.log(data);
        });
    });
  }
  updateStatusInactive() {
    console.log(this.estado);
    this.driverStatus = {
      estadoTrabajo: 0,
    };

    this.storage.get(TOKEN_KEY).then((res) => {
      this.driverService
        .update(res, this.driverStatus, this.id_client)
        .subscribe((data) => {
          console.log(data);
        });
    });
  }
  tomarPedido(pedido_id) {
    console.log("id pedido " + pedido_id + "this.id_client " + this.id_client);

    this.pedido1 = {
      id_conductor: this.id_client,
      id_estado: 2,
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
  changed(evt) {
    // the 'checked' value now is on $event.detail.value
    // instead of '$event.checked'
    if (evt.detail.value !== this.entrega) {
      // do things

      console.log("true creo");
    } else {
      console.log("false creo");
    }
  }
}
