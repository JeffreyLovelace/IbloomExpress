import { TestBed } from '@angular/core/testing';

import { NegocioService } from './negocio.service';

describe('NegocioService', () => {
  let service: NegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
