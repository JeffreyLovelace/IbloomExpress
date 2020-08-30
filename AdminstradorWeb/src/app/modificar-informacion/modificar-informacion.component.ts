import { Component, OnInit } from '@angular/core';
import { InformacionService } from '../services/informacion.service';
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
  selector: 'app-modificar-informacion',
  templateUrl: './modificar-informacion.component.html',
  styleUrls: ['./modificar-informacion.component.css']
})
export class ModificarInformacionComponent implements OnInit {

  files: any[];
  p: number = 1;
  id: any;
  informacion={
    'maximoPedidos':null, 
    'distanciaComercio':null,
    'distanciaDriver':null, 
    'telefono':null
  };
  constructor(
    private InformacionService: InformacionService,
    private router: Router

  ) {

    this.get();

  }

  ngOnInit(): void {
  }
  modificar() {

    this.InformacionService.actualizar(1, this.informacion).subscribe((data) => {
      alert("GUARDADO");
      this.get();
    }, () => {
      alert('Ocurrió un error guardar');
    });

  }
  get() {
    this.InformacionService.get().subscribe((data) => {
      this.informacion = data[0];
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  } 
}
