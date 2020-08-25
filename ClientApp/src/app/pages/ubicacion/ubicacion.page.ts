import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Storage } from "@ionic/storage";

import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";

declare var google;
@Component({
  selector: "app-ubicacion",
  templateUrl: "./ubicacion.page.html",
  styleUrls: ["./ubicacion.page.scss"],
})
export class UbicacionPage implements OnInit {
  mapRef = null;
  address: string;

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private router: Router,
    private nativeGeocoder: NativeGeocoder,
    private locationAccuracy: LocationAccuracy,
    private storage: Storage
  ) {
    this.enableLocation();
  }

  ngOnInit() {
    this.loadMap();
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();

    console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById("map");
    // create map
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
    });
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      // loaded
      loading.dismiss();
      this.addMarker(myLatLng.lat, myLatLng.lng);
    });
  }
  private addMarker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
      zoom: 8,
      map: this.mapRef,
      animation: google.maps.Animation.DROP,
      draggable: true,

      title: "Ubicación",
      icon: {
        url: "https://image.flaticon.com/icons/svg/1476/1476763.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
      },
    });
    let content = "<h4>Mi ubicación</h4>";
    this.getAddressFromCoords(lat, lng);

    this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.mapRef, marker);
    });

    google.maps.event.addListener(marker, "dragend", function () {
      this.markerlatlong = marker.getPosition();

      console.log("latlong   " + this.markerlatlong);
      console.log("lat    " + marker.getPosition().lat());
      console.log("long   " + marker.getPosition().lng());
    });
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude,
    };
  }
  getMenu() {
    this.router.navigateByUrl("/inicio");
  }
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        console.log(error);

        this.address = "Dirección no disponible!";
      });
    this.storage.set("address", this.address);
    this.storage.set("lattitude", lattitude);
    this.storage.set("longitude", longitude);
  }
  enableLocation() {
    // the accuracy option will be ignored by iOS
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          console.log("Request successful");
        },
        (error) => {
          console.log("Error requesting location permissions", error);
        }
      );
  }
}
