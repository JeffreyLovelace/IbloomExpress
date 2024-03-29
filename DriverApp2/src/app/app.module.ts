import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LaunchNavigator } from "@ionic-native/launch-navigator/ngx";
import { FCM } from "@ionic-native/fcm/ngx";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ,
    FCM,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
