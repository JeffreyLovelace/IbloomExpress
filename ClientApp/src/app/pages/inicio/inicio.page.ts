import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Tipocomercio } from "../../interfaces/tipocomercio";
import { NegocioService } from "../../services/negocio.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  @ViewChild("slides") slides;
  topStories: any;
  tipocomercios: Tipocomercio[];
  id = null;
  nombre = null;

  constructor(
    private negocioService: NegocioService,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ) {
    this.getNegocios();
    this.topStories = [
      {
        title: "Exploring San Francisco",
        author: "Rea Ramsey",
        body: "",
        picture: "https://picsum.photos/500/400?image=693",
      },
      {
        title: "Coffee the right way",
        author: "Ellesha Hartley",
        body: "",
        picture: "https://picsum.photos/500/400?image=1060",
      },
      {
        title: "Best Hiking In Yosemite",
        author: "Vinnie Alexander",
        body: "",
        picture: "https://picsum.photos/500/400?image=1043",
      },
      {
        title: "Astro Photography Guide",
        author: "Greg Rakozy",
        body: "",
        picture: "https://picsum.photos/500/400?image=903",
      },
    ];
  }

  getNegocios() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.negocioService.get(res).subscribe((data: Tipocomercio[]) => {
        this.tipocomercios = data;
        console.log(data);
      });
    });
  }
  slideChanged() {
    this.slides.nativeElement.getActiveIndex().then((index) => {
      console.log(index);
    });
  }
  ngOnInit() {}
}
