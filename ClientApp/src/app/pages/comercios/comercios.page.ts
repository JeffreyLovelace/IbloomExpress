import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-comercios",
  templateUrl: "./comercios.page.html",
  styleUrls: ["./comercios.page.scss"],
})
export class ComerciosPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  back() {
    this.router.navigateByUrl("/inicio");
  }
}
