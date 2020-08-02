import { Component, OnInit } from "@angular/core";
import { Combo } from "../interfaces/combo";
import { Pedido } from "../interfaces/pedido";

import { ComercioService } from "../services/comercio.service";
import { PedidoService } from "../services/pedidos.service";

import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  correo;
  idcomercio;
  id;
  pedidos: Pedido[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private authService: AuthService,
    private storage: Storage,
    private pedidoService: PedidoService
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
  get() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data) => {
        for (let datos of data) {
          if (datos.correo == this.correo) {
            this.idcomercio = datos.idcomercio;

            this.getPedido();
          }
        }
      });
    });
  }
  getPedido() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;
        console.log(this.pedidos);
      });
    });
  }
}
