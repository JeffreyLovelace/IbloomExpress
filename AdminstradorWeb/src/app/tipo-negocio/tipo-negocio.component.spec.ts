import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoNegocioComponent } from './tipo-negocio.component';

describe('TipoNegocioComponent', () => {
  let component: TipoNegocioComponent;
  let fixture: ComponentFixture<TipoNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
