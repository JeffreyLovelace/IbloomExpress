import { Component, OnInit } from "@angular/core";
import { OrdenService } from "../../services/orden.service";
import { Orden } from "../../interfaces/orden";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute, Params } from "@angular/router";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-orden",
  templateUrl: "./orden.page.html",
  styleUrls: ["./orden.page.scss"],
})
export class OrdenPage {
  id;
  ordenes: Orden[];

  constructor(
    public storage: Storage,
    private ordenService: OrdenService,
    public activatedRoute: ActivatedRoute
  ) {
    this.getOrden();
  }
  doRefresh(event) {
    this.getOrden();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  getOrden() {
    this.id = this.activatedRoute.snapshot.params["id"];

    this.storage.get(TOKEN_KEY).then((res) => {
      this.ordenService.get(res).subscribe((data: Orden[]) => {
        this.ordenes = data;
        console.log(this.ordenes);
      });
    });
  }
}
