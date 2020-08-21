import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Comercio } from "../../interfaces/comercio";
import { ComercioService } from "../../services/comercio.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
declare var google: any;
import { environment } from "../../../environments/environment";
const TOKEN_KEY = "access_token";
@Component({
  selector: "app-comercios",
  templateUrl: "./comercios.page.html",
  styleUrls: ["./comercios.page.scss"],
})
export class ComerciosPage {
  servidor = environment.url;
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
    private storage: Storage
  ) {
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
      if (distanceInKm < 100) {
        console.log("es menor wapo");
        console.log(comercio);

        this.mostrar.push(comercio);
      }
    }
    console.log(this.mostrar);
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
    }
  }
}
