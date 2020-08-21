import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConductorComponent } from './modificar-conductor.component';

describe('ModificarConductorComponent', () => {
  let component: ModificarConductorComponent;
  let fixture: ComponentFixture<ModificarConductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarConductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
