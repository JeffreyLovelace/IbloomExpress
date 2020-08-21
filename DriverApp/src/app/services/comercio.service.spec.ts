import { TestBed } from '@angular/core/testing';

import { ComercioService } from './comercio.service';

describe('ComercioService', () => {
  let service: ComercioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComercioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
