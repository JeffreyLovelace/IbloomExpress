import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MispedidosPage } from './mispedidos.page';

describe('MispedidosPage', () => {
  let component: MispedidosPage;
  let fixture: ComponentFixture<MispedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MispedidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MispedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
