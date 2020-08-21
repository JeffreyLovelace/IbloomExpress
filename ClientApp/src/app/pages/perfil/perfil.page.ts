import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { ClienteService } from "../../services/cliente.service";

import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Location } from "@angular/common";
import { AlertController } from "@ionic/angular";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage {
  correo;
  celular;
  nombre;
  apellido;
  cumpleanos;
  constructor(
    private storage: Storage,
    private authService: AuthService,
    private clienteService: ClienteService
  ) {
    this.getUser();
  }

  getUser() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.authService.getUser(res).subscribe((data) => {
        console.log(data);
        this.correo = data.email;
        this.getCliente(data.email);
      });
    });
  }
  getCliente(correo) {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.clienteService.get(res).subscribe((data) => {
        for (let cliente of data) {
          if (cliente.correo == correo) {
            this.nombre = cliente.pNombre;
            this.apellido = cliente.pApellido;
            this.cumpleanos = cliente.fechaNacimiento;
            this.celular = cliente.telefono;
            console.log("existeo puto!");
          }
        }
        console.log(data);
      });
    });
  }
}
