import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Storage } from "@ionic/storage";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(private authService: AuthService, private storage: Storage) {
    console.log(this.getDatos());
  }

  getDatos() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authService.getUser(res).subscribe((response) => {
          console.log(response);
        });
      }
    });
  }
}
