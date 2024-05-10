import { TestBed } from '@angular/core/testing';

import { TimeUtilService } from './time-util.service';

describe('TimeUtilService', () => {
  let service: TimeUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
