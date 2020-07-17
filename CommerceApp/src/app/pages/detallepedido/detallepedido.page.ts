import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";

declare var google;
@Component({
  selector: "app-detallepedido",
  templateUrl: "./detallepedido.page.html",
  styleUrls: ["./detallepedido.page.scss"],
})
export class DetallepedidoPage implements OnInit {
  mapRef = null;
  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMap();
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    //const myLatLng = await this.getLocation();

    //console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById("map");
    // create map
    this.mapRef = new google.maps.Map(mapEle, {
      //  center: myLatLng,
      zoom: 15,
    });
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      // loaded
      loading.dismiss();
      //   this.addMarker(myLatLng.lat, myLatLng.lng);
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
      title: "Ubicación",
      icon: {
        url: "https://image.flaticon.com/icons/svg/1476/1476763.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
      },
    });
  }

  getMenu() {
    this.router.navigateByUrl("/inicio");
  }
}
