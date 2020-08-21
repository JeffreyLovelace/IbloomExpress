import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mensaje = "";
  public correo = "admin@gmail.com";
  public password = "admin";
  public rol = "4";
  constructor(private router: Router, private loginService: LoginService) {
    this.auth();
  }


  auth() {
    this.loginService.auth().subscribe((data) => {
      this.rol = data["id_rol"];

    }, (err) => {
    });

  }

  ngOnInit(): void {
  }

  login() {
    var datos = {
      'email': this.correo,
      'password': this.password
    };

    this.loginService.login(datos).subscribe((data) => {
      if (data["mensaje"] == "Exito") {
        let token=data['access_token'];
        this.loginService.loginAdmin(datos).subscribe((data) => {
          if (true) {
            this.router.navigate(['/clientes']);
            localStorage.setItem("token", token);
          }else{
            alert('No es Administrador');
          }

        }, () => {
          this.router.navigate(['']);
          alert('No es Administrador');
        });
      }
    }, () => {
      this.router.navigate(['']);
      alert('Error');
    });
  }
}
