import { Component, OnInit } from "@angular/core";
import { Combo } from "../interfaces/combo";
import { ComercioService } from "../services/comercio.service";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
const TOKEN_KEY = "access_token";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  public promocion: boolean = false;
  idcomercio = null;
  corrreo = null;
  id = null;
  telefono = null;
  nombre = null;
  fotoLogo = null;
  fotoBaner = null;
  envio = null;
  direccion = null;
  referencia = null;
  precioMinimo = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.get();
  }
  get() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data) => {
        for (let datos of data) {
          if (datos.correo == "comercio@gmail.com") {
            this.corrreo = datos.correo;
            this.idcomercio = null;

            this.id = datos.id;
            this.telefono = datos.telefono;
            this.nombre = datos.nombre;
            this.fotoLogo = datos.fotoLogo;
            this.fotoBaner = datos.fotoBaner;
            this.envio = datos.envio;
            this.direccion = datos.direccion;
            this.referencia = datos.referencia;
            this.precioMinimo = datos.precioMinimo;
          } else {
            console.log("no existe");
          }
        }
      });
    });
  }
}
