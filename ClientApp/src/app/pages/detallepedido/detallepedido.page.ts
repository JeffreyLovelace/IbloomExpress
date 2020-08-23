import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Pedido } from "../../interfaces/pedido";
import { PedidoService } from "../../services/pedido.service";
import { OrdenService } from "../../services/orden.service";
import { Orden } from "../../interfaces/orden";

import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { environment } from "../../../environments/environment";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FirebaseService } from "../../services/firebase.service";
interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  dirrecion: string;
}
const TOKEN_KEY = "access_token";
declare var google;
@Component({
  selector: "app-detallepedido",
  templateUrl: "./detallepedido.page.html",
  styleUrls: ["./detallepedido.page.scss"],
})
export class DetallepedidoPage implements OnInit {
  mapRef = null;
  id;
  servidor = environment.url;
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
  lat2: any;
  lng2: any;
  ordenes: Orden[];
  delivery;

  nombreCompercio;
  pNombre;
  nota;
  telefono;
  telefonoComercio;
  latitude;
  longitude;
  UpdatePedido = {
    id_estado: null,
  };
  fotoLogo;
  id_conductor;
  tiempoDelivery;
  fotoComercio;
  conductor;
  conductorTelefono;

  conductorFoto;
  markers: Marker[] = [
    {
      position: {
        lat: this.lat2,
        lng: this.lng2,
      },
      dirrecion: "Parque Simón Bolivar2",
    },
  ];
  conductorTipoVehiculo;
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public activatedRoute: ActivatedRoute,
    public pedidoService: PedidoService,
    public storage: Storage,
    public geolocation: Geolocation,
    private alertController: AlertController,
    private ordenService: OrdenService,
    private firebaseService: FirebaseService
  ) {
    this.getDetalle();
  }

  ngOnInit() {}
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
        this.nota = this.pedidos[0].nota;
        console.log(this.pedidos[0].id_cliente);
        this.id_conductor = this.pedidos[0].id_conductor;

        this.id_estado = this.pedidos[0].id_estado;
        this.nit = this.pedidos[0].nit;
        this.razon_social = this.pedidos[0].razonSocial;
        this.total = this.pedidos[0].total;

        this.delivery = this.pedidos[0].pedidoDelivery;

        this.nombreCompercio = this.pedidos[0].nombreCompercio;
        this.pNombre = this.pedidos[0].pNombre;

        this.telefono = this.pedidos[0].telefono;
        this.telefonoComercio = this.pedidos[0].telefonoComercio;
        this.tiempoDelivery = this.pedidos[0].tiempoDelivery;
        this.fotoComercio = this.pedidos[0].fotoComercio;
        this.conductor = this.pedidos[0].conductor;
        this.conductorTelefono = this.pedidos[0].conductorTelefono;
        this.conductorFoto = this.pedidos[0].conductorFoto;
        this.conductorTipoVehiculo = this.pedidos[0].conductorTipoVehiculo;
        // this.addMarker(this.latitud_pedido, this.longitud_pedido);
        this.loadMap();
        this.getFirebase(Number(this.id_conductor));

        console.log(data);
      });
    });
  }
  getFirebase(camion) {
    this.firebaseService.read_students(String(camion)).subscribe((data) => {
      this.lat2 = Number(data.payload.data()["latitud"]);
      this.lng2 = Number(data.payload.data()["longitud"]);
      this.renderMarkers1();
    });
  }
  renderMarkers1() {
    this.markers.forEach((marker) => {
      this.addMarker1(marker);
      this.addInfoWindow(this.addMarker1(marker), "<h3>Repartidor!</h3>");
    });
  }
  addMarker1(marker: Marker) {
    return new google.maps.Marker({
      position: {
        lat: this.lat2,
        lng: this.lng2,
      },
      map: this.mapRef,
      title: marker.dirrecion,

      icon: {
        url: "https://image.flaticon.com/icons/svg/2833/2833394.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
      },
    });
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    this.latitude = myLatLng.lat;
    this.longitude = myLatLng.lng;
    console.log(myLatLng.lat);
    const mapEle: HTMLElement = document.getElementById("map1");
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
      this.addMarker(Number(this.latitud_pedido), Number(this.longitud_pedido));
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
    let content = "<h5>Pedido</h5>";
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
        url: "https://image.flaticon.com/icons/svg/787/787535.svg", // url
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
  getOrden() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.get(res).subscribe((data: Orden[]) => {
        this.ordenes = data;
        console.log(this.ordenes);
      });
    });
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
            console.log("Delete clicked");
          },
        },
        {
          text: "En el destino",
          icon: "locate",
          handler: () => {
            console.log("Share clicked");
          },
        },
        {
          text: "Inconveniente",
          icon: "build",
          handler: () => {
            console.log("Play clicked");
          },
        },
        {
          text: "Pedido entregado",
          icon: "trophy",
          handler: () => {
            console.log("Favorite clicked");
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
}
