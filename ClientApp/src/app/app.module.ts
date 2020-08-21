import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";

import { firebaseConfig } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";

import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { HttpClientModule } from "@angular/common/http";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDo2NMNimUHRIBT6AIOWPSjl0LITLr-6kk",
      authDomain: "ibloomexpress-2a20a.firebaseapp.com",
      databaseURL: "https://ibloomexpress-2a20a.firebaseio.com",
      projectId: "ibloomexpress-2a20a",
      storageBucket: "ibloomexpress-2a20a.appspot.com",
      messagingSenderId: "238573758608",
      appId: "1:238573758608:web:cca05f7d5c54022b291015",
      measurementId: "G-NSE47FPJYG",
    }),
    IonicStorageModule.forRoot({
      name: "__mydb",
      driverOrder: ["indexeddb", "sqlite", "websql"],
    }),

    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    LocationAccuracy,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
