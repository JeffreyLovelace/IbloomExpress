import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../services/conductor.service';
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
  selector: 'app-modificar-conductor',
  templateUrl: './modificar-conductor.component.html',
  styleUrls: ['./modificar-conductor.component.css']
})
export class ModificarConductorComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  id: any;
  conductor={
    'pNombre':null, 
    'sNombre':null,
    'pApellido':null, 
    'sApellido':null,
    'fechaNacimiento':null, 
    'direccion':null, 
    'correo':null,
    'telefono':null, 
    'foto':null
  };
  constructor(
    private ConductorService: ConductorService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {

    this.id = this.activatedRoute.snapshot.params['id'];

    this.formGroup = this.formBuilder.group({
      pNombre: new FormControl('', Validators.required),
      sNombre: new FormControl('', Validators.required),
      pApellido: new FormControl('', Validators.required),
      sApellido: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
    });
    this.get();
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.formGroup.get('foto').setValue(file);
  }
  ngOnInit(): void {
  }
  modificar() {

    this.ConductorService.actualizar(this.id, this.conductor).subscribe((data) => {
      alert("GUARDADO");
      this.router.navigate(['/conductor']);
    }, () => {
      alert('Ocurrió un error guardar');
    });

  }
  get() {
    this.ConductorService.detalle(this.id).subscribe((data) => {
      this.conductor = data[0];
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
}
