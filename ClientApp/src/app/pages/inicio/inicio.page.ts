import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  @ViewChild("slides") slides;
  topStories: any;

  constructor() {
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
  slideChanged() {
    this.slides.nativeElement.getActiveIndex().then((index) => {
      console.log(index);
    });
  }
  ngOnInit() {}
}
