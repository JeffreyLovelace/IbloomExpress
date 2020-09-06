import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../services/conductor.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment'
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
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  conductores;
  url = environment.url;
  constructor(
    private ConductorService: ConductorService,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      pNombre: new FormControl('', Validators.required),
      sNombre: new FormControl(''),
      pApellido: new FormControl('', Validators.required),
      sApellido: new FormControl(''),
      fechaNacimiento: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

      fotoVehiculo: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      tipoVehiculo: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      año: new FormControl('', Validators.required),


    });
    this.get();
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.formGroup.get('foto').setValue(file);
  }
  onFileChanges(event) {
    const files = event.target.files[0];
    this.formGroup.get('fotoVehiculo').setValue(files);
  }
  ngOnInit(): void {
  }
  save() {
    if (this.formGroup.valid) {
      const asd = new FormData();
      asd.append('pNombre', this.formGroup.get('pNombre').value);
      asd.append('sNombre', this.formGroup.get('sNombre').value);
      asd.append('pApellido', this.formGroup.get('pApellido').value);
      asd.append('sApellido', this.formGroup.get('sApellido').value);
      asd.append('fechaNacimiento', this.formGroup.get('fechaNacimiento').value);
      asd.append('direccion', this.formGroup.get('direccion').value);
      asd.append('correo', this.formGroup.get('correo').value);
      asd.append('password', this.formGroup.get('password').value);
      asd.append('telefono', this.formGroup.get('telefono').value);
      asd.append('foto', this.formGroup.get('foto').value);

      asd.append('fotoVehiculo', this.formGroup.get('fotoVehiculo').value);
      asd.append('modelo', this.formGroup.get('modelo').value);
      asd.append('tipoVehiculo', this.formGroup.get('tipoVehiculo').value);
      asd.append('color', this.formGroup.get('color').value);
      asd.append('año', this.formGroup.get('año').value);

      var datos = {
        'email': this.formGroup.get('correo').value,
        'password': this.formGroup.get('password').value,
        'id_rol': "2"
      };
      this.ConductorService.saveUsers(datos).subscribe((data) => {
        this.ConductorService.save(asd).subscribe((data) => {
          alert('GUARDADO');
          this.get();
        }, () => {
          alert('Ocurrió un error guardar');

        });

      }, () => {
        alert('Ocurrió un error guardar');
      });
    } else {
      alert("Ingrese todos los datos");
    }
  }
  get() {
    this.ConductorService.get().subscribe((data) => {
      this.conductores = data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
  eliminar(id) {
    this.ConductorService.eliminar(id).subscribe((data) => {
      this.conductores = data;
      this.get();
    }, () => {
      alert('Ocurrió un error al eliminar el dato');
    });
  }
}