import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Tipocomercio } from "../../interfaces/tipocomercio";
import { NegocioService } from "../../services/negocio.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ClienteService } from "../../services/cliente.service";
import { PedidoService } from "../../services/pedido.service";
import { Pedido } from "../../interfaces/pedido";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage {
  @ViewChild("slides") slides;
  pedidos: Pedido[];
  c = 0;
  topStories: any;
  tipocomercios: Tipocomercio[];
  id = null;
  nombre = null;
  id_client;
  constructor(
    private negocioService: NegocioService,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService
  ) {
    this.getNegocios();

    this.topStories = [
      {
        title: "Exploring San Francisco",
        author: "Rea Ramsey",
        body: "",
        picture: "https://picsum.photos/500/400?image=693",
      },
      {
        title: "Coffee the right way",
        author: "Ellesha Hartley",
        body: "",
        picture: "https://picsum.photos/500/400?image=1060",
      },
      {
        title: "Best Hiking In Yosemite",
        author: "Vinnie Alexander",
        body: "",
        picture: "https://picsum.photos/500/400?image=1043",
      },
      {
        title: "Astro Photography Guide",
        author: "Greg Rakozy",
        body: "",
        picture: "https://picsum.photos/500/400?image=903",
      },
    ];
  }
  ionViewWillEnter() {
    this.c = 0;
    this.getUser();
  }
  getNegocios() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.negocioService.get(res).subscribe((data: Tipocomercio[]) => {
        this.tipocomercios = data;
        console.log(data);
      });
    });
  }
  slideChanged() {
    this.slides.nativeElement.getActiveIndex().then((index) => {
      console.log(index);
    });
  }
  getUser() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.authService.getUser(res).subscribe((data) => {
        console.log(data);

        this.getCliente(data.email);
      });
    });
  }
  getCliente(correo) {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.clienteService.get(res).subscribe((data) => {
        for (let cliente of data) {
          if (cliente.correo == correo) {
            this.id_client = cliente.id;

            this.nombre = cliente.pNombre;
            this.getCantidad();
          }
        }
        console.log(data);
      });
    });
  }

  getCantidad() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.pedidoService.get(res).subscribe((data: Pedido[]) => {
        this.pedidos = data;
        console.log(this.id_client);

        for (let pedido of this.pedidos) {
          if (pedido.id_cliente == this.id_client && pedido.id_estado == "1") {
            this.c = this.c + 1;
          }
        }
        console.log("cantidad" + this.c);
      });
    });
  }
}
