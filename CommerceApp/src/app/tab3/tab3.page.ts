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
  correo = null;
  id = null;
  telefono = null;
  nombre;
  fotoLogo = null;
  fotoBaner = null;
  envio = null;
  direccion = null;
  referencia = null;
  precioMinimo = null;
  estadoTrabajo: boolean;
  horarioEnt;
  horarioSal;
  public tracking: boolean = false;
  comercioOpen = {
    estadoTrabajo: null,
  };
  comercioClose = {
    estadoTrabajo: null,
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.getUser();
  }
  getUser() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.authService.getUser(res).subscribe((response) => {
        this.correo = response.email;
        this.get();
      });
    });
  }
  doRefresh(event) {
    this.getUser();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  get() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data) => {
        for (let datos of data) {
          if (datos.correo == this.correo) {
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
            this.estadoTrabajo = datos.estadoTrabajo;
            this.horarioEnt = datos.horarioEnt;
            this.horarioSal = datos.horarioSal;
          } else {
            console.log("no existe");
          }
        }
      });
    });
  }
  abrir() {
    this.comercioOpen = {
      estadoTrabajo: 1,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService
        .edit(this.comercioOpen, res, this.id)
        .subscribe((data) => {
          this.getUser();
        });
    });
  }
  cerrar() {
    this.comercioClose = {
      estadoTrabajo: 0,
    };
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService
        .edit(this.comercioClose, res, this.id)
        .subscribe((data) => {
          this.getUser();
        });
    });
  }
}
