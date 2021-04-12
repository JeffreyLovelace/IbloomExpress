import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Pedido } from "../../interfaces/pedido";
import { PedidoService } from "../../services/pedidos.service";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
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
  lat2: any;
  lng2: any;
  pedido1 = {
    id_estado: null,
  };
  totalfin;
  id;
  id_pedido;
  longitud_comercio;
  latitud_comercio;
  longitud_pedido;
  latitud_pedido;
  id_estado;
  nit;
  razon_social;
  conductorTelefono;
  total;
  pedidos: Pedido[];
  id_conductor;
  delivery;
  nota;
  token;
  nombreCompercio;
  pedidoDelivery;
  pNombre;
  markers: Marker[] = [
    {
      position: {
        lat: null,
        lng: null,
      },
      dirrecion: "Parque Simón Bolivar2",
    },
  ];
  telefono;
  telefonoComercio;
  latitude;
  longitude;
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
    private alertController: AlertController,
    private firebaseService: FirebaseService
  ) {
    this.getDetalle();
  }

  ngOnInit() {
    this.loadMap();
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
        this.id_conductor = this.pedidos[0].id_conductor;
        this.id_estado = this.pedidos[0].id_estado;
        this.nit = this.pedidos[0].nit;
        this.razon_social = this.pedidos[0].razonSocial;
        this.total = this.pedidos[0].total;
        this.nota = this.pedidos[0].nota;
        this.conductorTelefono = this.pedidos[0].conductorTelefono;
        this.delivery = this.pedidos[0].delivery;
        this.token = this.pedidos[0].token;

        this.nombreCompercio = this.pedidos[0].nombreCompercio;
        this.pNombre = this.pedidos[0].pNombre;
        this.pedidoDelivery = this.pedidos[0].pedidoDelivery;
        this.telefono = this.pedidos[0].telefono;
        this.telefonoComercio = this.pedidos[0].telefonoComercio;
        this.totalfin = this.pedidoDelivery + this.total;
        // this.addMarker(this.latitud_pedido, this.longitud_pedido);
        this.loadMap();
        this.getFirebase(Number(this.id_conductor));
      });
    });
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    // const myLatLng = await this.getLocation();
    // this.latitude = myLatLng.lat;
    // this.longitude = myLatLng.lng;
    // console.log(myLatLng.lat);
    const mapEle: HTMLElement = document.getElementById("map1");
    // create map
    this.mapRef = new google.maps.Map(mapEle, {
      center: {
        lat: Number(this.latitud_pedido),
        lng: Number(this.longitud_pedido),
      },
      zoom: 15,
    });
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      // loaded
      loading.dismiss();
      //  this.addMyMarker(myLatLng.lat, myLatLng.lng);
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
  /* private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude,
    };
  }*/

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.mapRef, marker);
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
      this.addInfoWindow(this.addMarker1(marker), "<h2>Repartidor!</h2></br>");
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Estado",
      mode: "ios",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Aceptar",
          //  role: "destructive",
          icon: "car-sport",
          handler: () => {
            this.tomarPedido(2);
            this.pedidoService.enPreparacion(this.token).subscribe((res) => {
              console.log(res);
            });
            this.pedidoService.enPreparacionDrivers().subscribe((res) => {
              console.log(res);
            });
          },
        },
        {
          text: "Rechazar",
          icon: "locate",
          handler: () => {
            this.tomarPedido(6);
            this.pedidoService.rechazado(this.token).subscribe((res) => {
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

  tomarPedido(id_estado) {
    this.pedido1 = {
      id_estado: id_estado,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.edit(this.pedido1, res, this.id).subscribe(
        (data) => this.getDetalle(),
        (error) => console.log()
      );
    });
  }
}
