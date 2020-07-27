import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public storage: Storage) {}

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}
