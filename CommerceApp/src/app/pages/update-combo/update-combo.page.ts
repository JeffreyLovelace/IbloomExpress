import { Component, OnInit } from "@angular/core";
import { Combo } from "../../interfaces/combo";
import { ComboService } from "../../services/combo.service";
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ComercioService } from "../../services/comercio.service";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

const TOKEN_KEY = "access_token";
@Component({
  selector: "app-update-combo",
  templateUrl: "./update-combo.page.html",
  styleUrls: ["./update-combo.page.scss"],
})
export class UpdateComboPage {
  combos: Combo[];
  id;
  nombre;
  descripcion;
  precio;
  stock;
  promocion;

  combo = {
    nombre: null,
    descripcion: null,
    precio: null,
    stock: null,
    promocion: null,
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private authService: AuthService,
    private storage: Storage,
    private comercioService: ComercioService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.nombre = this.activatedRoute.snapshot.params["nombre"];
    this.descripcion = this.activatedRoute.snapshot.params["descripcion"];
    this.precio = this.activatedRoute.snapshot.params["precio"];
    this.stock = this.activatedRoute.snapshot.params["stock"];
    this.promocion = this.activatedRoute.snapshot.params["promocion"];
  }

  edit() {
    this.combo = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock,
      promocion: this.promocion,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.comboService.edit(this.combo, res, this.id).subscribe(
          (data) => this.presentToast(),
          (error) => this.presentToastError()
        );
      }
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.nombre + " actulizado correctamente",

      duration: 2000,
    });
    toast.present();
    this.router.navigateByUrl("/tabs/tab2");
  }
  async presentToastError() {
    const toast = await this.toastController.create({
      message: "Algo salió mal",
      duration: 2000,
    });
    toast.present();
  }
}
