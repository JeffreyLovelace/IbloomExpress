import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAdministradorComponent } from './modificar-administrador.component';

describe('ModificarAdministradorComponent', () => {
  let component: ModificarAdministradorComponent;
  let fixture: ComponentFixture<ModificarAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
