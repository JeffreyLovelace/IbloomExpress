import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { DriverService } from "../../services/driver.service";

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
export class PerfilPage implements OnInit {
  id;
  correo;
  telefono;
  pNombre;
  sNombre;
  pApellido;
  sApellido;
  direccion;
  fotoVehiculo;
  modelo;
  tipoVehiculo;
  color;
  ano;
  fechaNacimiento;
  estadoTrabajo;
  created_at;
  foto;
  constructor(
    private storage: Storage,
    private authService: AuthService,
    private driverService: DriverService
  ) {
    this.getUser();
  }
  doRefresh(event) {
    this.getUser();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {}
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
      this.driverService.get(res).subscribe((data) => {
        for (let cliente of data) {
          if (cliente.correo == correo) {
            this.telefono = cliente.telefono;
            this.pNombre = cliente.pNombre;
            this.sNombre = cliente.sNombre;
            this.pApellido = cliente.pApellido;
            this.sApellido = cliente.sApellido;
            this.direccion = cliente.direccion;
            this.fotoVehiculo = cliente.fotoVehiculo;
            this.modelo = cliente.modelo;
            this.tipoVehiculo = cliente.tipoVehiculo;
            this.color = cliente.color;
            this.ano = cliente.año;
            this.fechaNacimiento = cliente.fechaNacimiento;
            this.estadoTrabajo = cliente.estadoTrabajo;
            this.foto = cliente.foto;
            this.created_at = cliente.created_at;
          }
        }
        console.log(data);
      });
    });
  }
}
