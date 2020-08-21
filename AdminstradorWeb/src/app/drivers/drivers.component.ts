import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';

import { AngularFirestore } from 'angularfire2/firestore';
import{environment} from '../../environments/environment'

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -16.8779431;
  lng: number = -49.8046873;
  zoom: number = 10;
   icon = {
    url: 'https://image.flaticon.com/icons/svg/609/609361.svg',
    scaledSize: { height: 40, width: 40 },
  }; 
  puntos;
  constructor(
    private RestaurantService: RestaurantService,
    db: AngularFirestore
  ) {
    //this.get();
    this.getPuntos();
  }

  ngOnInit(): void {  }

  getPuntos() {
    this.RestaurantService.read_Students().subscribe((data) => {
      this.puntos = data.map((e) => {
        return {
          id_camion: e.payload.doc.id,

          latitud: e.payload.doc.data()['latitud'],
          longitud: e.payload.doc.data()['longitud'],
          foto: {url:environment.dominio+"/imagenes/"+e.payload.doc.data()['foto'],scaledSize: { height: 40, width: 40 }}
        };
      });

    });

  }

  get() {
    this.RestaurantService.get().subscribe((data) => {
      this.puntos = data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }

  
}
