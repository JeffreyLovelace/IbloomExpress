import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Combo } from "../../interfaces/combo";
import { ComboService } from "../../services/combo.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Location } from "@angular/common";
import { AlertController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { PedidoPage } from "../../pages/pedido/pedido.page";
import { Platform } from "@ionic/angular";
const TOKEN_KEY = "access_token";
declare var google: any;

@Component({
  selector: "app-platos",
  templateUrl: "./platos.page.html",
  styleUrls: ["./platos.page.scss"],
})
export class PlatosPage {
  servidor = environment.url;
  searchText;
  fotoLogo;
  fotoBaner;
  envio;
  precioMinimo;
  id = null;
  id_pedido;
  pedido;
  nombre = null;
  combos: Combo[];
  latitud;
  longitud;
  velocidad = 8;
  tiempo;
  km;
  segmentModel = "productos";
  lattitude;
  longitude;
  extra;
  envioTotal;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private storage: Storage,
    private location: Location,
    private alertController: AlertController,
    private modalController: ModalController,
    private platform: Platform
  ) {
    this.storage.get("lattitude").then((val) => {
      this.lattitude = val;
    });
    this.storage.get("longitude").then((val) => {
      this.longitude = val;
    });

    this.id = this.activatedRoute.snapshot.params["id"];
    this.nombre = this.activatedRoute.snapshot.params["nombre"];
    this.fotoLogo = this.activatedRoute.snapshot.params["fotoLogo"];
    this.fotoBaner = this.activatedRoute.snapshot.params["fotoBaner"];
    this.envio = this.activatedRoute.snapshot.params["envio"];
    this.precioMinimo = this.activatedRoute.snapshot.params["precioMinimo"];
    this.latitud = this.activatedRoute.snapshot.params["latitud"];
    this.longitud = this.activatedRoute.snapshot.params["longitud"];

    this.getCombos();
  }

  segmentChanged(event) {
    console.log(this.segmentModel);
  }

  back() {
    this.storage.get("pedido").then((val) => {
      if (val) {
        this.presentAlertConfirm();
      } else {
        this.router.navigateByUrl("/inicio");
      }
      // this.id_pedido = val;
    });
  }
  getCombos() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comboService.get(res).subscribe((data: Combo[]) => {
        this.combos = data;
        console.log(data);
        this.calculateDistance(
          this.lattitude,
          this.longitude,
          this.latitud,
          this.longitud
        );
      });
    });
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.storage.get("pedido").then((val) => {
      if (val) {
        this.pedido = true;
      } else {
        this.pedido = false;
      }
      // this.id_pedido = val;
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",

      header: "Su pedido se cancelara",
      subHeader: "Desea continuar?",

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
          text: "Si, continuar",
          handler: () => {
            this.storage.remove("pedido");
            this.router.navigateByUrl("/inicio");
          },
        },
      ],
    });

    await alert.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PedidoPage,
      cssClass: "my-custom-class",
      componentProps: {
        firstName: "Douglas",
        lastName: "Adams",
        middleInitial: "N",
      },
    });
    return await modal.present();
  }
  calculateDistance(lat1, ln1, lat2, lng2) {
    console.log(lat1, ln1);
    console.log(lat2, lng2);

    var gps1 = new google.maps.LatLng(Number(lat1), Number(ln1));
    var gps2 = new google.maps.LatLng(Number(lat2), Number(lng2));

    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      gps1,
      gps2
    );

    this.km = distance / 1000;
    this.tiempo = Math.round((this.km / this.velocidad) * 60);
    this.extra = this.tiempo + 10;
    if (this.km <= 2) {
      this.envioTotal = this.envio * 1;
    }
    if (this.km > 2 && this.km <= 4) {
      this.envioTotal = this.envio * 1.5;
    }
    if (this.km > 4 && this.km <= 6) {
      this.envioTotal = this.envio * 2;
    }
    if (this.km > 6 && this.km <= 8) {
      this.envioTotal = this.envio * 3.5;
    }
    if (this.km > 8) {
      this.envioTotal = this.envio * 5;
    }
  }
  isItemAvailable = false;

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== "") {
      this.isItemAvailable = true;
      this.combos = this.combos.filter((item) => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.isItemAvailable = false;
      this.getCombos();
    }
  }
}
