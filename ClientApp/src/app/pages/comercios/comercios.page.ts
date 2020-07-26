import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Comercio } from "../../interfaces/comercio";
import { ComercioService } from "../../services/comercio.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";

const TOKEN_KEY = "access_token";
@Component({
  selector: "app-comercios",
  templateUrl: "./comercios.page.html",
  styleUrls: ["./comercios.page.scss"],
})
export class ComerciosPage {
  id = null;
  nombre = null;
  comercios: Comercio[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private storage: Storage
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.nombre = this.activatedRoute.snapshot.params["nombre"];
    this.getComercio();
  }

  back() {
    this.router.navigateByUrl("/inicio");
  }
  getComercio() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data: Comercio[]) => {
        this.comercios = data;
        console.log(data);
      });
    });
  }
}
