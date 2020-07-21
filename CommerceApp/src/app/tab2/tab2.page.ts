import { Component, OnInit } from "@angular/core";
import { Combo } from "../interfaces/combo";
import { ComboService } from "../services/combo.service";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ComercioService } from "../services/comercio.service";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  combos: Combo[];
  public promocion: boolean = false;
  idcomercio = null;
  correo = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private authService: AuthService,
    private storage: Storage,
    private comercioService: ComercioService
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
        console.log(this.combos);
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
}
