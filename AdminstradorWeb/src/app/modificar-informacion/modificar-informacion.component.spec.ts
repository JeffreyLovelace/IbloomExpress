import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInformacionComponent } from './modificar-informacion.component';

describe('ModificarInformacionComponent', () => {
  let component: ModificarInformacionComponent;
  let fixture: ComponentFixture<ModificarInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
