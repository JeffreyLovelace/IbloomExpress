import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-detalleproducto",
  templateUrl: "./detalleproducto.page.html",
  styleUrls: ["./detalleproducto.page.scss"],
})
export class DetalleproductoPage {
  currentNumber = 1;
  constructor() {}

  increment() {
    this.currentNumber++;
  }

  decrement() {
    this.currentNumber--;
  }
}
