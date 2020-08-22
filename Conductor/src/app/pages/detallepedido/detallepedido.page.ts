import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Pedido } from "../../interfaces/pedido";
import { PedidoService } from "../../services/pedido.service";
import { Storage } from "@ionic/storage";
import {
  LaunchNavigator,
  LaunchNavigatorOptions,
} from "@ionic-native/launch-navigator/ngx";
import { environment } from "../../../environments/environment";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

const TOKEN_KEY = "access_token";
declare var google;
@Component({
  selector: "app-detallepedido",
  templateUrl: "./detallepedido.page.html",
  styleUrls: ["./detallepedido.page.scss"],
})
export class DetallepedidoPage implements OnInit {
  pedido1 = {
    id_estado: null,
  };
  pedido2 = {
    id_estado: null,
    tiempoDelivery: null,
  };
  servidor = environment.url;
  mapRef = null;
  id;
  id_pedido;
  longitud_comercio;
  latitud_comercio;
  longitud_pedido;
  latitud_pedido;
  id_estado;
  nit;
  razon_social;
  total;
  pedidos: Pedido[];
  nota;
  delivery;
  token;
  nombreCompercio;
  pNombre;
  fotoComercio;
  telefono;
  telefonoComercio;
  latitude;
  tiempoDelivery;
  longitude;
  pedidoDelivery;
  UpdatePedido = {
    id_estado: null,
  };
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public activatedRoute: ActivatedRoute,
    public pedidoService: PedidoService,
    public storage: Storage,
    public geolocation: Geolocation,
    private launchNavigator: LaunchNavigator,
    private alertController: AlertController,
    public toastController: ToastController
  ) {
    this.getDetalle();
  }

  ngOnInit() {}
  doRefresh(event) {
    this.getDetalle();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  getDetalle() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.detalle(res, this.id).subscribe((data: Pedido[]) => {
        this.pedidos = data;
        this.longitud_pedido = Number(this.pedidos[0].longitud);
        this.latitud_pedido = Number(this.pedidos[0].latitud);
        this.longitud_comercio = Number(this.pedidos[0].comerciolonitud);
        this.latitud_comercio = Number(this.pedidos[0].comerciolatitud);
        this.id_pedido = this.pedidos[0].id;
        this.fotoComercio = this.pedidos[0].fotoComercio;
        this.id_estado = this.pedidos[0].id_estado;
        this.nit = this.pedidos[0].nit;
        this.razon_social = this.pedidos[0].razonSocial;
        this.total = this.pedidos[0].total;
        this.tiempoDelivery = this.pedidos[0].tiempoDelivery;
        this.delivery = this.pedidos[0].delivery;
        this.nota = this.pedidos[0].nota;
        this.pedidoDelivery = this.pedidos[0].pedidoDelivery;
        this.nombreCompercio = this.pedidos[0].nombreCompercio;
        this.pNombre = this.pedidos[0].pNombre;
        this.token = this.pedidos[0].token;
        this.telefono = this.pedidos[0].telefono;
        this.telefonoComercio = this.pedidos[0].telefonoComercio;
        // this.addMarker(this.latitud_pedido, this.longitud_pedido);
        this.loadMap();

        console.log(data);
      });
    });
  }
  mylgn;
  myltd;
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    this.latitude = myLatLng.lat;
    this.longitude = myLatLng.lng;
    console.log(myLatLng.lat);
    const mapEle: HTMLElement = document.getElementById("map");
    // create map
    this.mapRef = new google.maps.Map(mapEle, {
      center: {
        lat: myLatLng.lat,
        lng: myLatLng.lng,
      },
      zoom: 15,
    });
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      // loaded
      loading.dismiss();
      this.addMyMarker(myLatLng.lat, myLatLng.lng);
      this.mylgn = myLatLng.lng;
      this.myltd = myLatLng.lat;
      this.addMarker(Number(this.latitud_pedido), Number(this.longitud_pedido));
      this.addMarkerComercio(
        Number(this.latitud_comercio),
        Number(this.longitud_comercio)
      );
    });
  }
  private addMarker(lat: number, lng: number) {
    console.log(lat, lng);

    const marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
      zoom: 8,
      map: this.mapRef,
      title: "Ubicación",
      icon: {
        url: "https://image.flaticon.com/icons/svg/1476/1476763.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
      },
    });
    let content =
      "<h5>Pedido</h5>" +
      '<a href="https://www.google.com/maps/dir/?api=1&origin=' +
      this.myltd +
      "," +
      this.mylgn +
      "&destination=" +
      lat +
      "," +
      lng +
      "" +
      '"><h5>Ruta</h5></a>';
    marker.setMap(this.mapRef);

    // https://www.google.com/maps/dir//-16.4360577,-68.050949/@-16.4764219,-68.0902384,12
    this.addInfoWindow(marker, content);
  }

  private addMarkerComercio(lat: number, lng: number) {
    console.log(lat, lng);

    const marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
      zoom: 8,
      map: this.mapRef,
      title: "Ubicación",
      icon: {
        url: this.servidor + "/imagenes/" + this.fotoComercio, // url
        scaledSize: new google.maps.Size(50, 50), // size
      },
    });
    let content =
      this.nombreCompercio +
      '<a href="https://www.google.com/maps/dir/?api=1&origin=' +
      this.myltd +
      "," +
      this.mylgn +
      "&destination=" +
      lat +
      "," +
      lng +
      "" +
      '"><h5>Ruta</h5></a>';
    marker.setMap(this.mapRef);

    // https://www.google.com/maps/dir//-16.4360577,-68.050949/@-16.4764219,-68.0902384,12
    this.addInfoWindow(marker, content);
  }
  private addMyMarker(lat: number, lng: number) {
    console.log(lat, lng);

    const marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
      zoom: 8,
      map: this.mapRef,
      title: "Ubicación",
      icon: {
        url: "https://image.flaticon.com/icons/svg/2833/2833394.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
      },
    });
    let content = "<h5>Mi ubicación</h5>";
    marker.setMap(this.mapRef);

    // https://www.google.com/maps/dir//-16.4360577,-68.050949/@-16.4764219,-68.0902384,12
    this.addInfoWindow(marker, content);
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude,
    };
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Estado",
      mode: "ios",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "En camino",
          //  role: "destructive",
          icon: "car-sport",
          handler: () => {
            this.tomarPedido(3);
            this.pedidoService.enCamino(this.token).subscribe((res) => {
              console.log(res);
            });
          },
        },
        {
          text: "En el destino",
          icon: "locate",
          handler: () => {
            this.tomarPedido(5);
            this.pedidoService.enDestino(this.token).subscribe((res) => {
              console.log(res);
            });
          },
        },
        {
          text: "Inconveniente",
          icon: "build",
          handler: () => {
            this.time();
          },
        },
        {
          text: "Pedido entregado",
          icon: "trophy",
          handler: () => {
            this.tomarPedido(6);
            this.pedidoService.entrega(this.token).subscribe((res) => {
              console.log(res);
            });
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.mapRef, marker);
    });
  }
  navigateLocation() {
    let options: LaunchNavigatorOptions = {
      start: [this.latitude, this.longitude],
      app: this.launchNavigator.APP.GOOGLE_MAPS,
    };
    this.launchNavigator.navigate("London, ON", options).then(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  tomarPedido(id_estado) {
    this.pedido1 = {
      id_estado: id_estado,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.edit(this.pedido1, res, this.id).subscribe(
        (data) => this.getDetalle(),
        (error) => this.presentAlertError()
      );
    });
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Algo salió mal :(",
      message: "Intente de nuevo",
      buttons: ["OK"],
    });
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Cambios de estado exitoso.",
      duration: 2000,
    });
    this.getDetalle();
    toast.present();
  }

  async time() {
    const alert = await this.alertController.create({
      mode: "ios",

      inputs: [
        {
          placeholder: "¿Qué pasó?",
          name: "name1",
          type: "text",
        },
        {
          placeholder: "Tiempo aproximado",
          name: "tiempo",
          type: "number",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (alertData) => {
            //takes the data
            console.log(alertData.name1);
            console.log(alertData.tiempo);

            this.tomarPedido2(4, alertData.tiempo);
            this.pedidoService
              .trancadera(this.token, alertData.name1)
              .subscribe((res) => {
                console.log(res);
              });
          },
        },
      ],
    });
    await alert.present();
  }
  tomarPedido2(id_estado, tiempo) {
    this.pedido2 = {
      id_estado: id_estado,
      tiempoDelivery: tiempo,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.edit(this.pedido2, res, this.id).subscribe(
        (data) => this.getDetalle(),
        (error) => this.presentAlertError()
      );
    });
  }
}
