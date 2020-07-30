import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Pedido } from "../../interfaces/pedido";
import { PedidoService } from "../../services/pedido.service";
import { Storage } from "@ionic/storage";

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
  longitud_comercio;
  latitud_comercio;
  longitud_pedido;
  latitud_pedido;
  id_estado;
  nit;
  razon_social;
  total;
  pedidos: Pedido[];
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public activatedRoute: ActivatedRoute,
    public pedidoService: PedidoService,
    public storage: Storage
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
        // this.addMarker(this.latitud_pedido, this.longitud_pedido);
        this.loadMap();

        console.log(this.longitud_pedido);
      });
    });
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    //const myLatLng = await this.getLocation();

    // console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById("map");
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
      //this.addMarker(myLatLng.lat, myLatLng.lng);
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
  }
  /* private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude,
    };
  }*/
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      mode: "ios",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          handler: () => {
            console.log("Delete clicked");
          },
        },
        {
          text: "Share",
          icon: "share",
          handler: () => {
            console.log("Share clicked");
          },
        },
        {
          text: "Play (open modal)",
          icon: "caret-forward-circle",
          handler: () => {
            console.log("Play clicked");
          },
        },
        {
          text: "Favorite",
          icon: "heart",
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
}
