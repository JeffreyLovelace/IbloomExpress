import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Comercio } from "../../interfaces/comercio";
import { ComercioService } from "../../services/comercio.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
declare var google: any;
import { ToastController } from "@ionic/angular";
import { Informacion } from "../../interfaces/informacion";
import { InformacionService } from "../../services/informacion.service";

import { environment } from "../../../environments/environment";
const TOKEN_KEY = "access_token";
myDate: new Date().getTime();

@Component({
  selector: "app-comercios",
  templateUrl: "./comercios.page.html",
  styleUrls: ["./comercios.page.scss"],
})
export class ComerciosPage {
  servidor = environment.url;
  myDate: String = new Date().toISOString();
  distanciaComercio;
  informaciones: Informacion[];

  id = null;
  lattitude;
  longitude;
  nombre = null;
  comercios: Comercio[];
  markers = [];
  filteredMarkers = [];
  mostrar = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private storage: Storage,
    public toastController: ToastController,
    private informacionService: InformacionService
  ) {
    this.informacionService.get().subscribe((data: Informacion[]) => {
      this.informaciones = data;
      this.distanciaComercio = this.informaciones[0].distanciaComercio;
    });
    this.storage.get("lattitude").then((val) => {
      this.lattitude = val;
    });
    this.storage.get("longitude").then((val) => {
      this.longitude = val;
    });
    this.id = this.activatedRoute.snapshot.params["id"];
    this.nombre = this.activatedRoute.snapshot.params["nombre"];
    this.getComercio();
  }
  ionViewWillEnter() {
    this.storage.get("pedido").then((val) => {
      if (val) {
        this.storage.remove("pedido");
        this.presentToast();
      }
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Se elimino su pedido",
      duration: 2000,
    });
    toast.present();
  }
  back() {
    this.router.navigateByUrl("/inicio");
  }
  getComercio() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data: Comercio[]) => {
        this.comercios = data;
        console.log(data);
        this.calculateDistance();
      });
    });
  }

  calculateDistance() {
    console.log(this.lattitude, this.longitude);

    var center = new google.maps.LatLng(
      Number(this.lattitude),
      Number(this.longitude)
    );
    for (let comercio of this.comercios) {
      const markerLoc = new google.maps.LatLng(
        comercio.latitud,
        comercio.longitud
      );
      const distanceInKm =
        google.maps.geometry.spherical.computeDistanceBetween(
          markerLoc,
          center
        ) / 1000;
      if (distanceInKm < this.distanciaComercio) {
        console.log(comercio);

        this.mostrar.push(comercio);
      }
    }
  }
  FilterJSONData(ev: any) {
    this.getComercio();
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.comercios = this.comercios.filter((item) => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
  /*getItems(ev) {
    // Reset items back to all of the items
    this.getComercio();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.comercios = this.comercios.filter((item) => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }*/
  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== "") {
      this.mostrar = this.mostrar.filter((item) => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      const val = ev.target.value;

      this.getComercio();
    }
  }
}
