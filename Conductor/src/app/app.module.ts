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
