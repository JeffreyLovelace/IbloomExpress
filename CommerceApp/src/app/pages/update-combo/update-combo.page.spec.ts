import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateComboPage } from './update-combo.page';

describe('UpdateComboPage', () => {
  let component: UpdateComboPage;
  let fixture: ComponentFixture<UpdateComboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComboPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
