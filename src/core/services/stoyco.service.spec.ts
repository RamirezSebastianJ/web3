import { TestBed } from '@angular/core/testing';

import { StoycoService } from './stoyco.service';

describe('StoycoService', () => {
  let service: StoycoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoycoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
