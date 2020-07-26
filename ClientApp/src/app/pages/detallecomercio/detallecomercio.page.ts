import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ComercioService } from "../../services/comercio.service";
import { Comercio } from "../../interfaces/comercio";
import { Storage } from "@ionic/storage";

const TOKEN_KEY = "access_token";

declare var google;
@Component({
  selector: "app-detallecomercio",
  templateUrl: "./detallecomercio.page.html",
  styleUrls: ["./detallecomercio.page.scss"],
})
export class DetallecomercioPage implements OnInit {
  comercios: Comercio[];
  mapRef = null;
  id;

  telefono;
  nombre;

  fotoLogo;
  fotoBaner;
  envio;
  direccion;
  referencia;
  precioMinimo;

  longitud;
  latitud;
  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private comercioService: ComercioService
  ) {
    this.getComercio();
    this.id = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.loadMap();
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();

    console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById("map1");
    // create map
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
    });
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      // loaded
      loading.dismiss();
      this.addMarker(myLatLng.lat, myLatLng.lng);
    });
  }
  private addMarker(lat: number, lng: number) {
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
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude,
    };
  }

  getComercio() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data: Comercio[]) => {
        this.comercios = data;
        for (let comercio of this.comercios) {
          if (comercio.id == this.id) {
            this.telefono = comercio.telefono;
            this.nombre = comercio.nombre;

            this.fotoLogo = comercio.fotoLogo;
            this.fotoBaner = comercio.fotoBaner;
            this.envio = comercio.envio;
            this.direccion = comercio.direccion;
            this.referencia = comercio.referencia;
            this.precioMinimo = comercio.precioMinimo;

            this.longitud = comercio.longitud;
            this.latitud = comercio.latitud;
          }
        }
        console.log(data);
      });
    });
  }

  getMenu() {
    this.router.navigateByUrl("/inicio");
  }
}
