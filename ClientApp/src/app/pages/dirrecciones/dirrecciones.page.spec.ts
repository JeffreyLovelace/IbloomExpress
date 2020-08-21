import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirreccionesPage } from './dirrecciones.page';

describe('DirreccionesPage', () => {
  let component: DirreccionesPage;
  let fixture: ComponentFixture<DirreccionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirreccionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirreccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
