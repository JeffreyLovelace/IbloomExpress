import { TestBed } from '@angular/core/testing';

import { DirrecionService } from './dirrecion.service';

describe('DirrecionService', () => {
  let service: DirrecionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirrecionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
