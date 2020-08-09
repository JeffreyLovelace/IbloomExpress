import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { HttpClientModule } from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { LaunchNavigator } from "@ionic-native/launch-navigator/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
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
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    BackgroundGeolocation,
    Geolocation,
    LaunchNavigator,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
