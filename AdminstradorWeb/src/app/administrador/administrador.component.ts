import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../services/administrador.service';
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
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  administradores;
  constructor(  
    private AdministradorService: AdministradorService,
    private formBuilder: FormBuilder,
    ) 
    { 
    this.formGroup = this.formBuilder.group({
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
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
    asd.append('correo', this.formGroup.get('correo').value);
    asd.append('telefono', this.formGroup.get('telefono').value);
    asd.append('password', this.formGroup.get('password').value);
   
    var datos={
      'email':this.formGroup.get('correo').value,
      'password':this.formGroup.get('password').value,
      'id_rol':"4"
    };
    this.AdministradorService.saveUsers(datos).subscribe((data) => {
      this.AdministradorService.save(asd).subscribe((data) => {
        alert('GUARDADO');
        this.get();
      }, () => {
        alert('Ocurrió un error guardar');

      });

    }, () => {
      alert('Ocurrió un error guardar');
    });

  }
  get(){
    this.AdministradorService.get().subscribe((data) => {
      this.administradores=data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
  eliminar(id) {
    this.AdministradorService.eliminar(id).subscribe((data) => {
      this.administradores = data;
      this.get();
    }, () => {
      alert('Ocurrió un error al eliminar el dato');
    });
  }
}