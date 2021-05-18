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
import { InformacionService } from "../services/informacion.service";
import { PedidoService } from "../services/pedido.service";
import { Location } from "@angular/common";
import { NgZone } from "@angular/core";

import { OrdenService } from "../services/orden.service";
import { AuthService } from "../services/auth.service";
import { FirebaseService } from "../services/firebase.service";
import { DriverService } from "../services/driver.service";
import { AlertController } from "@ionic/angular";
import { Pedido } from "../interfaces/pedido";
import { Informacion } from "../interfaces/informacion";

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
declare var google: any;

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  pedidos: Pedido[];
  informaciones: Informacion[];

  pedidos2: Pedido[];
  servidor = environment.url;
  id_client;
  estado;
  public tracking: boolean;
  id;
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
  nombre;
  c_pedido = 0;
  foto;
  longitud;
  latitud;
  mostrar = [];

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private router: Router,
    private storage: Storage,
    private driverService: DriverService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private fcm: FCM,
    private geolocation: Geolocation,
    private zone: NgZone,
    private informacionService: InformacionService
  ) {
    this.fcm.getToken().then((token) => {
      console.log(token);
    });
    this.fcm.subscribeToTopic("drivers");
    this.informacionService.get().subscribe((data: Informacion[]) => {
      this.informaciones = data;
      this.distanciaDriver = this.informaciones[0].distanciaDriver;
      this.maximoPedidos = this.informaciones[0].maximoPedidos;
    });
    let escucahador = this.geolocation.watchPosition();

    escucahador.subscribe((resultado) => {
      this.logs.push(
        "Lat:" +
          resultado.coords.latitude +
          ", Long" +
          resultado.coords.longitude
      );
      this.longitud = resultado.coords.longitude;

      this.latitud = resultado.coords.latitude;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
  doRefresh(event) {
    this.gePedido();
    this.getUser();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
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
  refresh() {
    this.zone.run(() => {
      console.log("force update the screen");
    });
  }
  calculateDistance() {
    console.log(
      "distancia driver" +
        this.distanciaDriver +
        "max pedidos" +
        this.maximoPedidos
    );
    this.mostrar.splice(0);
    console.log(this.latitud, this.longitud);

    var center = new google.maps.LatLng(
      Number(this.latitud),
      Number(this.longitud)
    );
    for (let comercio of this.pedidos) {
      const markerLoc = new google.maps.LatLng(
        comercio.latitud,
        comercio.longitud
      );
      const distanceInKm =
        google.maps.geometry.spherical.computeDistanceBetween(
          markerLoc,
          center
        ) / 1000;
      if (distanceInKm < this.distanciaDriver && comercio.id_estado == "2") {
        console.log(comercio);
        this.contador++;
        this.mostrar.push(comercio);
      }
    }
  }
  contador = 0;
  start() {
    this.fcm.getToken().then((token) => {
      console.log(token);
    });
    this.fcm.subscribeToTopic("drivers");
    console.log("driver suscribe");

    // ionic push notification example
    this.fcm.onNotification().subscribe((data) => {
      console.log(data);
      if (data.wasTapped) {
      } else {
      }
    });
    let escucahador = this.geolocation.watchPosition();

    escucahador.subscribe((resultado) => {
      this.logs.push(
        "Lat:" +
          resultado.coords.latitude +
          ", Long" +
          resultado.coords.longitude
      );
      this.longitud = resultado.coords.longitude;

      this.latitud = resultado.coords.latitude;
      this.localization(resultado.coords.latitude, resultado.coords.longitude);
    });
    this.updateStatusActive();
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates

      interval: 300000,
      fastestInterval: 300000,
      activitiesInterval: 300000,
      startForeground: true,
      stopOnStillActivity: true,
      activityType: "AutomotiveNavigation",
      notificationTitle: "Dunne Delivery",
      notificationText: this.nombre + " esta activo ",
    };

    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          this.localization(location.latitude, location.longitude);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        });
    });

    // start recording location
    this.backgroundGeolocation.start();
    this.calculateDistance();
  }

  stopBackgroundGeolocation() {
    this.updateStatusInactive();
    this.backgroundGeolocation.stop();
  }
  gePedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;
        this.calculateDistance();
      });
    });
  }
  distanciaDriver;
  maximoPedidos;
  getInformacion() {
    this.informacionService.get().subscribe((data: Informacion[]) => {
      this.informaciones = data;
      this.distanciaDriver = this.informaciones[0].distanciaDriver;
      this.maximoPedidos = this.informaciones[0].maximoPedidos;
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
            this.foto = cliente.foto;
            if (cliente.estadoTrabajo == 1) {
              this.tracking = true;
            } else {
              this.tracking = false;
            }
            this.estado = cliente.estadoTrabajo;

            this.nombre = cliente.pNombre;
            this.gePedido();
          }
        }
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
          this.getUser();
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
          this.getUser();
        });
    });
  }
  valor;
  tomarPedido(pedido_id, tokenpedido, tokencomercio) {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos2 = data;
        for (let pedidos2 of data) {
          if (
            (pedidos2.id_conductor == this.id_client &&
              pedidos2.id_estado == "2") ||
            (pedidos2.id_conductor == this.id_client &&
              pedidos2.id_estado == "3") ||
            (pedidos2.id_conductor == this.id_client &&
              pedidos2.id_estado == "4") ||
            (pedidos2.id_conductor == this.id_client &&
              pedidos2.id_estado == "5")
          ) {
            this.c_pedido = this.c_pedido + 1;
          }
        }

        if (this.c_pedido >= this.maximoPedidos) {
          this.presentAlertErrorPedido();
        } else {
          this.storage.get(TOKEN_KEY).then((res) => {
            this.pedidoService
              .detalle(res, pedido_id)
              .subscribe((data: Pedido[]) => {
                this.pedidoService.tomarPedido(tokenpedido).subscribe((res) => {
                  console.log(res);
                });

                if (data[0].id_estado != "2") {
                  this.presentAlertError();
                } else {
                  this.pedido1 = {
                    id_conductor: this.id_client,
                    id_estado: 3,
                  };
                  this.storage.get(TOKEN_KEY).then((res) => {
                    this.pedidoService
                      .edit(this.pedido1, res, pedido_id)
                      .subscribe(
                        (data) => this.presentAlert(),
                        (error) => this.presentAlertError()
                      );
                  });
                }
              });
          });
        }
      });
    });
  }

  async presentAlertConfirm(pedido_id, tokenpedido, tokencomercio) {
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
            this.tomarPedido(pedido_id, tokenpedido, tokencomercio);
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
  async presentAlertErrorPedido() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Solo puede tomar " + this.maximoPedidos + " pedidos máximo",
      message: "Termine los pedidos por favor.",
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
    } else {
    }
  }
  localization(latitude, longitude) {
    console.log("create");
    this.firebaseService
      .crete(String(this.id_client), latitude, longitude, this.foto)
      .then((resp) => {
        this.backgroundGeolocation.finish(); // FOR IOS ONLY
      });
  }
}
