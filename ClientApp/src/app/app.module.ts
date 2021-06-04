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

import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";

import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { HttpClientModule } from "@angular/common/http";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import * as firebase from "firebase";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC9g69oJi5NuwQfOSLKo7FiuHFAVXDcPrI",
      authDomain: "klausux-b5c54.firebaseapp.com",
      databaseURL: "https://klausux-b5c54-default-rtdb.firebaseio.com",
      projectId: "klausux-b5c54",
      storageBucket: "klausux-b5c54.appspot.com",
      messagingSenderId: "14368813630",
      appId: "1:14368813630:web:0f11d1706a739f2a4a976f",
      measurementId: "G-PKGY7FZK5K",
    }),

    IonicStorageModule.forRoot({
      name: "__mydb",
      driverOrder: ["indexeddb", "sqlite", "websql"],
    }),

    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [
    FirebaseAuthentication,
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
