import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService) {}

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}
