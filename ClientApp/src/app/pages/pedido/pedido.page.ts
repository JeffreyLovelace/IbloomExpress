import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.page.html",
  styleUrls: ["./pedido.page.scss"],
})
export class PedidoPage {
  currentNumber = 1;
  constructor() {}

  increment() {
    this.currentNumber++;
  }

  decrement() {
    this.currentNumber--;
  }
}
