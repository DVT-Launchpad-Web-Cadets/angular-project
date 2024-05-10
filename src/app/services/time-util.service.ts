import { Injectable } from '@angular/core';
import { FirebaseTimestamp } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TimeUtilService {

  constructor() { }

  firebaseTimestampToDate(timestamp: FirebaseTimestamp | Date): Date {
    if (timestamp instanceof Date) {
      return timestamp;
    } else {
      const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
      return new Date(milliseconds);
    }
  }
}
