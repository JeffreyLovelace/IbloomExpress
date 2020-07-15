import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComerciosPage } from './comercios.page';

describe('ComerciosPage', () => {
  let component: ComerciosPage;
  let fixture: ComponentFixture<ComerciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComerciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComerciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
