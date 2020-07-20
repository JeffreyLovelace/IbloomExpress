import { Component, OnInit } from "@angular/core";
import { Combo } from "../../interfaces/combo";
import { ComboService } from "../../services/combo.service";
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Storage } from "@ionic/storage";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastController } from "@ionic/angular";
const TOKEN_KEY = "access_token";
@Component({
  selector: "app-nuevoproducto",
  templateUrl: "./nuevoproducto.page.html",
  styleUrls: ["./nuevoproducto.page.scss"],
})
export class NuevoproductoPage {
  public formGroup: FormGroup;
  combos: Combo[];
  public promocion: boolean = false;
  idcomercio = null;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private authService: AuthService,
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.getUser();
    this.get();
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      precio: new FormControl("", Validators.required),
      foto: new FormControl("", Validators.required),
      promocion: new FormControl("", Validators.required),
    });
  }
  save() {
    const formData = new FormData();
    formData.append("id_comercio", this.idcomercio);
    formData.append("nombre", this.formGroup.get("nombre").value);
    formData.append("descripcion", this.formGroup.get("descripcion").value);
    formData.append("precio", this.formGroup.get("precio").value);
    formData.append("foto", this.formGroup.get("foto").value);
    formData.append("estadoEliminado", "0");
    if (this.promocion == true) {
      formData.append("promocion", "1");
    } else {
      formData.append("promocion", "0");
    }
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.comboService.save(formData, res).subscribe(
          (data) => this.presentToast("Se guardo correctamente."),
          (error) => this.presentToastError("Algo salió mal")
        );
      }
    });
  }
  getUser() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.authService.getUser(res).subscribe((response) => {
        console.log(response.id);
        this.idcomercio = response.id;
      });
    });
  }
  get() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comboService.get(res).subscribe((data: Combo[]) => {
        this.combos = data;
        console.log(this.combos);
      });
    });
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.formGroup.get("foto").setValue(file);
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    this.router.navigateByUrl("/tabs/tab2");
    toast.present();
  }
  async presentToastError(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
