import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentInformationPage } from './payment-information.page';

describe('PaymentInformationPage', () => {
  let component: PaymentInformationPage;
  let fixture: ComponentFixture<PaymentInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
