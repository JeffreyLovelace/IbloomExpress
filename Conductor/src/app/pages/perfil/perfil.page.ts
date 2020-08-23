import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { DriverService } from "../../services/driver.service";
import { PedidoService } from "../../services/pedido.service";

import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Location } from "@angular/common";
import { AlertController } from "@ionic/angular";
import { Pedido } from "../../interfaces/pedido";
import { PopoverController } from "@ionic/angular";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {
  myDate: String = new Date().toISOString();
  pedidos: Pedido[];
  servidor = environment.url;

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
  id_client;
  billetera;
  constructor(
    private storage: Storage,
    private authService: AuthService,
    private driverService: DriverService,
    private pedidoService: PedidoService,
    private alertController: AlertController,
    public popoverController: PopoverController
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
            this.id_client = cliente.id;

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
            this.billetera = cliente.billetera;
            this.fechaNacimiento = cliente.fechaNacimiento;
            this.estadoTrabajo = cliente.estadoTrabajo;
            this.foto = cliente.foto;
            this.created_at = cliente.created_at;
          }
          this.gePedido(this.id_client);
        }
        console.log(data);
      });
    });
  }
  c = 0;
  generado = 0;
  gePedido(id) {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;

        for (let cliente of this.pedidos) {
          if (id == cliente.id_conductor && cliente.id_estado == "6") {
            this.c++;
            this.generado = this.generado + Number(cliente.pedidoDelivery);
          }
        }
      });
    });
  }
  async presentAlert() {
    this.listItems = [];
    for (let item of this.pedidos) {
      let li = new ListItem();
      li.name = item.id;
      li.thumbnail = item.pedidoDelivery;
      this.listItems.push(li);
    }

    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alert",
      subHeader: "Subtitle",
      buttons: this.listItems,
    });

    await alert.present();
  }
  listItems: Array<any> = [];
}

class ListItem {
  name: number;
  thumbnail: any;
}
