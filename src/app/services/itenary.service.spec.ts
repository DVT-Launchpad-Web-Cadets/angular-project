import { TestBed } from '@angular/core/testing';

import { ItenaryService } from './itenary.service';

describe('ItenaryService', () => {
  let service: ItenaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItenaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
