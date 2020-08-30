import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { MouseEvent } from '@agm/core';

import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  restaurantes;
  tipoNegocios;
  coords = {};
  latitude: number = -16.501430;
  longitude: number = -68.132895;
  constructor(
    private RestaurantService: RestaurantService,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      id_tipoComercio: new FormControl('', Validators.required),
      fotoLogo: new FormControl('', Validators.required),
      fotoBaner: new FormControl('', Validators.required),
      envio: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      referencia: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      precioMinimo: new FormControl('', Validators.required),
      horarioSal: new FormControl('', Validators.required),
      horarioEnt: new FormControl('', Validators.required),
    });
    this.get();
    this.gettipoNegocios();
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.formGroup.get('fotoLogo').setValue(file);
  }
  onFileChanges(event) {
    const files = event.target.files[0];
    this.formGroup.get('fotoBaner').setValue(files);
  }
  ngOnInit(): void {
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
  save() {
    if (this.formGroup.valid) {
      const asd = new FormData();
      asd.append('correo', this.formGroup.get('correo').value);
      asd.append('telefono', this.formGroup.get('telefono').value);
      asd.append('nombre', this.formGroup.get('nombre').value);
      asd.append('id_tipoComercio', this.formGroup.get('id_tipoComercio').value);
      asd.append('fotoLogo', this.formGroup.get('fotoLogo').value);
      asd.append('fotoBaner', this.formGroup.get('fotoBaner').value);
      asd.append('envio', this.formGroup.get('envio').value);
      asd.append('direccion', this.formGroup.get('direccion').value);
      asd.append('referencia', this.formGroup.get('referencia').value);
      asd.append('latitud', this.latitude + "");
      asd.append('longitud', this.longitude + "");
      asd.append('precioMinimo', this.formGroup.get('precioMinimo').value);
      asd.append('horarioSal', this.formGroup.get('horarioSal').value);
      asd.append('horarioEnt', this.formGroup.get('horarioEnt').value);
      asd.append('delivery', this.formGroup.get('envio').value);

      var datos = {
        'email': this.formGroup.get('correo').value,
        'password': this.formGroup.get('password').value,
        'id_rol': "3"
      };
      this.RestaurantService.saveUsers(datos).subscribe((data) => {
        this.RestaurantService.save(asd).subscribe((data) => {
          alert('GUARDADO');
          console.log(data);
          this.get();
        }, () => {
          alert('Ocurrió un error guardars');

        });

      }, () => {
        alert('Ocurrió un error guardar');
      });

    }else{
      alert("Ingrese todos los datos");
    }
  }
  get() {
    this.RestaurantService.get().subscribe((data) => {
      this.restaurantes = data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
  gettipoNegocios() {
    this.RestaurantService.gettipoNegocios().subscribe((data) => {
      this.tipoNegocios = data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
  eliminar(id) {
    this.RestaurantService.eliminar(id).subscribe((data) => {
      this.restaurantes = data;
      this.get();
    }, () => {
      alert('Ocurrió un error al eliminar el dato');
    });
  }
}