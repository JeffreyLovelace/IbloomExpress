import { TestBed } from "@angular/core/testing";

import { PedidoService } from "./pedidos.service";

describe("PedidosService", () => {
  let service: PedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
