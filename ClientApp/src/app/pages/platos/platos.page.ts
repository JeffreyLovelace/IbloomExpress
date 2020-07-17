import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: "app-platos",
  templateUrl: "./platos.page.html",
  styleUrls: ["./platos.page.scss"],
})
export class PlatosPage {
  segmentModel = "productos";
  constructor(private router: Router) {}

  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
  }

  back() {
    this.router.navigateByUrl("/comercios");
  }
}
