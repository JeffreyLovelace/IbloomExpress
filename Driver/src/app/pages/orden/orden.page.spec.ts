import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdenPage } from './orden.page';

describe('OrdenPage', () => {
  let component: OrdenPage;
  let fixture: ComponentFixture<OrdenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
