import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ComercioService } from "../../services/comercio.service";
import { Comercio } from "../../interfaces/comercio";
import { Storage } from "@ionic/storage";
import { environment } from "../../../environments/environment";

const TOKEN_KEY = "access_token";

declare var google: any;
@Component({
  selector: "app-detallecomercio",
  templateUrl: "./detallecomercio.page.html",
  styleUrls: ["./detallecomercio.page.scss"],
})
export class DetallecomercioPage implements OnInit {
  comercios: Comercio[];
  mapRef = null;
  id;
  servidor = environment.url;

  telefono;
  nombre;
  velocidad = 8;
  tiempo;
  fotoLogo;
  fotoBaner;
  envio;
  direccion;
  referencia;
  precioMinimo;
  km;
  longitud;
  latitud;
  lattitude;
  longitude;
  horarioEnt;
  horarioSal;
  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private comercioService: ComercioService
  ) {
    this.storage.get("lattitude").then((val) => {
      this.lattitude = val;
    });
    this.storage.get("longitude").then((val) => {
      this.longitude = val;
    });
    this.getComercio();
    this.id = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {}
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
      this.addMyMarker(Number(this.latitud), Number(this.longitud));

      this.addMarker(myLatLng.lat, myLatLng.lng);

      this.calculateDistance(
        myLatLng.lat,
        myLatLng.lng,
        Number(this.latitud),
        Number(this.longitud)
      );
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
        url: "https://image.flaticon.com/icons/svg/1673/1673221.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
      },
    });
  }
  private addMyMarker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
      zoom: 8,
      map: this.mapRef,
      title: "Ubicación",
      icon: {
        url: "https://image.flaticon.com/icons/svg/1673/1673241.svg", // url
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
            this.horarioEnt = comercio.horarioEnt;
            this.horarioSal = comercio.horarioSal;

            this.longitud = comercio.longitud;
            this.latitud = comercio.latitud;
            this.loadMap();
          }
        }
      });
    });
  }
  calculateDistance(lat1, ln1, lat2, lng2) {
    var gps1 = new google.maps.LatLng(Number(lat1), Number(ln1));
    var gps2 = new google.maps.LatLng(Number(lat2), Number(lng2));

    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      gps1,
      gps2
    );

    this.km = distance / 1000;
    this.tiempo = Math.round((this.km / this.velocidad) * 60);
  }
  getMenu() {
    this.router.navigateByUrl("/inicio");
  }
}
