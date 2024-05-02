import { TestBed } from '@angular/core/testing';

import { TripFirebaseService } from './trip-firebase.service';

describe('TripFirebaseService', () => {
  let service: TripFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
