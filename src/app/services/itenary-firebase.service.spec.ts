import { TestBed } from '@angular/core/testing';

import { ItenaryFirebaseService } from './itenary-firebase.service';

describe('ItenaryFirebaseService', () => {
  let service: ItenaryFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItenaryFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
