import { TestBed } from '@angular/core/testing';

import { TipoNegocioService } from './tipo-negocio.service';

describe('TipoNegocioService', () => {
  let service: TipoNegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoNegocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
