import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
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
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  clientes;
  constructor(
    private ClienteService: ClienteService,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      pNombre: new FormControl('', Validators.required),
      sNombre: new FormControl('', Validators.required),
      pApellido: new FormControl('', Validators.required),
      sApellido: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.get();
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.formGroup.get('foto').setValue(file);
  }
  ngOnInit(): void {
  }
  save() {
    const asd = new FormData();
    asd.append('pNombre', this.formGroup.get('pNombre').value);
    asd.append('sNombre', this.formGroup.get('sNombre').value);
    asd.append('password', this.formGroup.get('password').value);
    asd.append('pApellido', this.formGroup.get('pApellido').value);
    asd.append('sApellido', this.formGroup.get('sApellido').value);
    asd.append('fechaNacimiento', this.formGroup.get('fechaNacimiento').value);
    asd.append('telefono', this.formGroup.get('telefono').value);
    asd.append('correo', this.formGroup.get('correo').value);
    
    var datos={
      'email':this.formGroup.get('correo').value,
      'password':this.formGroup.get('password').value,
      'id_rol':"1"
    };
    this.ClienteService.saveUsers(datos).subscribe((data) => {
      this.ClienteService.save(asd).subscribe((data) => {
        alert('GUARDADO');
        this.get();
      }, () => {
        alert('Ocurrió un error guardar');

      });

    }, () => {
      alert('Ocurrió un error guardar');
    });

  }
  get() {
    this.ClienteService.get().subscribe((data) => {
      this.clientes = data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
  eliminar(id) {
    this.ClienteService.eliminar(id).subscribe((data) => {
      this.clientes = data;
      this.get();
    }, () => {
      alert('Ocurrió un error al eliminar el dato');
    });
  }
}