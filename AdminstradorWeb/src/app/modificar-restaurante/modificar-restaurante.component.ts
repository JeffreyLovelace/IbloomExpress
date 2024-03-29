import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  selector: 'app-modificar-restaurante',
  templateUrl: './modificar-restaurante.component.html',
  styleUrls: ['./modificar-restaurante.component.css']
})
export class ModificarRestauranteComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  id: any;
  tipoNegocios;
  conductor={
    'correo':null, 
    'telefono':null,
    'nombre':null, 
    'id_tipoComercio':null,
    'fotoLogo':null, 
    'fotoBaner':null, 
    'envio':null,
    'direccion':null, 
    'referencia':null,
    'horarioSal':null,
    'horarioEnt':null
  };
  constructor(
    private RestaurantService: RestaurantService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {

    this.id = this.activatedRoute.snapshot.params['id'];

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
      horarioSal: new FormControl('', Validators.required),
      horarioEnt: new FormControl('', Validators.required),
    });
    this.get();
    this.gettipoNegocios()
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.formGroup.get('fotoLogo').setValue(file);
  }
  ngOnInit(): void {
  }
  modificar() {
    const asd = new FormData();
    asd.append('correo', this.formGroup.get('correo').value);
    asd.append('telefono', this.formGroup.get('telefono').value);
    asd.append('nombre', this.formGroup.get('nombre').value);
    asd.append('id_tipoComercio', this.formGroup.get('id_tipoComercio').value);
    asd.append('correo', this.formGroup.get('correo').value);
    asd.append('telefono', this.formGroup.get('telefono').value);
    asd.append('nombre', this.formGroup.get('nombre').value);
    asd.append('id_tipoComercio', this.formGroup.get('id_tipoComercio').value);
    asd.append('fotoLogo', this.formGroup.get('fotoLogo').value);
    asd.append('fotoBaner', this.formGroup.get('fotoBaner').value);
    asd.append('envio', this.formGroup.get('envio').value);
    asd.append('direccion', this.formGroup.get('direccion').value);
    asd.append('referencia', this.formGroup.get('referencia').value);
    asd.append('horarioSal', this.formGroup.get('horarioSal').value);
    asd.append('horarioEnt', this.formGroup.get('horarioEnt').value);


    this.RestaurantService.actualizar(this.id, this.conductor).subscribe((data) => {
      alert("GUARDADO");
      this.router.navigate(['/restaurant']);
    }, () => {
      alert('Ocurrió un error guardar');
    });

  }
  get() {
    this.RestaurantService.detalle(this.id).subscribe((data) => {
      this.conductor = data[0];
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
}
