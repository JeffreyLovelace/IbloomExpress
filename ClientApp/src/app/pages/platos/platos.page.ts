import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Combo } from "../../interfaces/combo";
import { ComboService } from "../../services/combo.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Location } from "@angular/common";
import { AlertController } from "@ionic/angular";

const TOKEN_KEY = "access_token";
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
  segmentModel = "productos";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private storage: Storage,
    private location: Location,
    private alertController: AlertController
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.nombre = this.activatedRoute.snapshot.params["nombre"];
    this.fotoLogo = this.activatedRoute.snapshot.params["fotoLogo"];
    this.fotoBaner = this.activatedRoute.snapshot.params["fotoBaner"];
    this.envio = this.activatedRoute.snapshot.params["envio"];
    this.precioMinimo = this.activatedRoute.snapshot.params["precioMinimo"];

    this.getCombos();
  }

  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
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
      });
    });
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.storage.get("pedido").then((val) => {
      if (val) {
        console.log("hay pedido");
        this.pedido = true;
      } else {
        console.log("no hay pedido");
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
}
