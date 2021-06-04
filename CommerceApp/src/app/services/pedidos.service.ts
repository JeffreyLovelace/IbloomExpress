import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable, from, of } from "rxjs";
import { take, map, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { environment } from "../../environments/environment";
const helper = new JwtHelperService();
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root",
})
export class PedidoService {
  token = null;
  servidor = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  get(token): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(`${this.servidor}/api/vistas/pedido`, {
      headers: headers,
    });
  }
  detalle(token, id_pedido): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(
      `${this.servidor}/api/vistas/pedidoDetalle/` + id_pedido,
      {
        headers: headers,
      }
    );
  }
  save(token, data): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);

    return this.http.post(`${this.servidor}/api/pedido`, data, {
      headers: headers,
    });
  }

  edit(data, token, id_combo) {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.put(`${this.servidor}/api/pedido/` + id_combo, data, {
      headers: headers,
    });
  }
  dato;
  enPreparacion(token) {
    this.dato = {
      notification: {
        title: "Su pedido esta en preparación",
        body: "Puede revisar el estado en el carrito de compras.",
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
      to: token,
      priority: "high",
    };
    let headers = new HttpHeaders().set(
      "Authorization",
      "key=AAAAA1hysj4:APA91bG7oneU1TwNwbzeT8LQV1vHqtXBJuPRY6lXIHfwJO4S9vYyrQEj3s3N190fbixUX23qx3CS1kw8TnHS2HXx9d6gaFOdVrVF6RF-w4L2vt0IFtPT8PGV65MYYnqPWKllf57Y0UcT"
    );
    headers = headers.append("Content-Type", "application/json");

    return this.http.post("https://fcm.googleapis.com/fcm/send", this.dato, {
      headers: headers,
    });
  }

  rechazado(token) {
    this.dato = {
      notification: {
        title: "Su pedido fue cancelado",
        body: "El comercio presento algun error ",
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
      to: token,
      priority: "high",
    };
    let headers = new HttpHeaders().set(
      "Authorization",
      "key=AAAAA1hysj4:APA91bG7oneU1TwNwbzeT8LQV1vHqtXBJuPRY6lXIHfwJO4S9vYyrQEj3s3N190fbixUX23qx3CS1kw8TnHS2HXx9d6gaFOdVrVF6RF-w4L2vt0IFtPT8PGV65MYYnqPWKllf57Y0UcT"
    );
    headers = headers.append("Content-Type", "application/json");

    return this.http.post("https://fcm.googleapis.com/fcm/send", this.dato, {
      headers: headers,
    });
  }
  enPreparacionDrivers() {
    this.dato = {
      notification: {
        title: "Nuevo pedido registrado",
        body: "KLAUSUX registro un nuevo pedido.",
        sound: "sound.mp3",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
      to: "/topics/drivers",
      priority: "high",
    };
    let headers = new HttpHeaders().set(
      "Authorization",
      "key=AAAAA1hysj4:APA91bG7oneU1TwNwbzeT8LQV1vHqtXBJuPRY6lXIHfwJO4S9vYyrQEj3s3N190fbixUX23qx3CS1kw8TnHS2HXx9d6gaFOdVrVF6RF-w4L2vt0IFtPT8PGV65MYYnqPWKllf57Y0UcT"
    );
    headers = headers.append("Content-Type", "application/json");

    return this.http.post("https://fcm.googleapis.com/fcm/send", this.dato, {
      headers: headers,
    });
  }
}
