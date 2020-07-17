import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallecomercioPage } from './detallecomercio.page';

describe('DetallecomercioPage', () => {
  let component: DetallecomercioPage;
  let fixture: ComponentFixture<DetallecomercioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallecomercioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallecomercioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
