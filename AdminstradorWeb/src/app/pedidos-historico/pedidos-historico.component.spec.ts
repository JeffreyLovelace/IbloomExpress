import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosHistoricoComponent } from './pedidos-historico.component';

describe('PedidosHistoricoComponent', () => {
  let component: PedidosHistoricoComponent;
  let fixture: ComponentFixture<PedidosHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
