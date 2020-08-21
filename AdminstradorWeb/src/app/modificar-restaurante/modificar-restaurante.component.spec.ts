import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRestauranteComponent } from './modificar-restaurante.component';

describe('ModificarRestauranteComponent', () => {
  let component: ModificarRestauranteComponent;
  let fixture: ComponentFixture<ModificarRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
