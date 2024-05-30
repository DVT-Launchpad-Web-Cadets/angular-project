import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { TripInterface } from '../models';
import { doc } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/selectors/auth.selectors';
import { AuthState } from '../store/state/auth.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TimeUtilService } from './time-util.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  firestore = inject(Firestore);
  tripsCollection = collection(this.firestore, 'trips');

  userId$ = this.store.select(selectUser);
  userId = '';

  constructor(
    private store: Store<AuthState>,
    private timeUtilService: TimeUtilService
  ) {
    this.userId$.pipe(takeUntilDestroyed()).subscribe((userId) => {
      this.userId = userId ?? '';
    });
  }

  getTrips(): Observable<TripInterface[]> {
    const q = query(this.tripsCollection, where('userId', '==', this.userId));
    const collectionData$ = collectionData(q, { idField: 'id' }) as Observable<
      TripInterface[]
    >;

    return collectionData$.pipe(
      map((trips) =>
        trips.map((trip) => ({
          ...trip,
          startDate: this.timeUtilService.firebaseTimestampToDate(
            trip.startDate
          ),
          endDate: this.timeUtilService.firebaseTimestampToDate(trip.endDate),
        }))
      )
    );
  }

  addTrip(trip: TripInterface): Observable<string> {
    const tripWithUserId = { ...trip, userId: this.userId };
    const promise = addDoc(this.tripsCollection, tripWithUserId).then(
      (response) => response.id
    );
    return from(promise);
  }

  deleteTrip(tripId: string): Observable<void> {
    const docRef = doc(this.firestore, `trips/${tripId}`);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  editTrip(trip: TripInterface): Observable<void> {
    if (!trip.id) {
      throw new Error('Trip ID is not set');
    }

    const docRef = doc(this.firestore, `trips/${trip.id}`);
    const promise = setDoc(docRef, trip).catch((error) => {
      console.error('Error editing trip:', error);
      throw error;
    });
    return from(promise);
  }
}
