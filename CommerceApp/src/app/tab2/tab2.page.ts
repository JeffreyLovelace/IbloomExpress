import { Component, OnInit } from "@angular/core";
import { Combo } from "../interfaces/combo";
import { ComboService } from "../services/combo.service";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  combos: Combo[];
  public promocion: boolean = false;
  idcomercio = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.get();
  }
  get() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comboService.get(res).subscribe((data: Combo[]) => {
        this.combos = data;
        console.log(this.combos);
      });
    });
  }
}
