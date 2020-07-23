import { Component, OnInit } from "@angular/core";
import { Combo } from "../interfaces/combo";
import { ComboService } from "../services/combo.service";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ComercioService } from "../services/comercio.service";
import { AlertController } from "@ionic/angular";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  combos: Combo[];
  combos1: Combo[];
  public promocion: boolean = false;
  idcomercio = null;
  correo = null;
  dataDelete = {
    estadoEliminado: null,
  };
  combo = {
    nombre: null,
    descripcion: null,
    precio: null,
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private authService: AuthService,
    private storage: Storage,
    private comercioService: ComercioService,
    public alertController: AlertController
  ) {
    this.getCorreo();
  }
  get() {
    console.log(this.idcomercio);

    this.storage.get(TOKEN_KEY).then((res) => {
      this.comboService.get(res).subscribe((data: Combo[]) => {
        // for (let datos of data) {
        //  if (1 == datos.id_comercio) {
        this.combos = data;
        //    console.log("mio");

        //   }
        // }
      });
    });
  }
  getCorreo() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.authService.getUser(res).subscribe((response) => {
        this.correo = response.email;
        this.getId();
      });
    });
  }
  getId() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data) => {
        for (let datos of data) {
          if (datos.correo == this.correo) {
            this.idcomercio = datos.id;
            this.get();
          }
        }
      });
    });
  }
  delete(id_producto) {
    this.dataDelete = {
      estadoEliminado: "0",
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.comboService.edit(this.dataDelete, res, id_producto).subscribe(
          (data) => console.log("Se elimino correctamente."),
          (error) => console.log("Algo salió mal")
        );
      }
    });
  }
  doRefresh(event) {
    this.get();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentAlertPrompt(id, nombre, descripcion, precio) {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",

      header: "Editar " + nombre,

      inputs: [
        { name: "name2", type: "text", value: nombre, placeholder: "Nombre" },
        {
          type: "text",

          value: descripcion,
          placeholder: "Descripción",
        },
        {
          type: "text",

          value: precio,
          placeholder: "Precio",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Confirmar",
          handler: () => {
            this.combo = {
              nombre: nombre,
              descripcion: descripcion,
              precio: precio,
            };
            this.edit(id);
            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();
  }
  edit(id_producto) {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.comboService.edit(this.combo, res, id_producto).subscribe(
          (data) => console.log("Se actualizo correctamente."),
          (error) => console.log("Algo salió mal")
        );
      }
    });
  }
}
