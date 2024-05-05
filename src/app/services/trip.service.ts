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
import { Observable, from } from 'rxjs';
import { TripInterface } from '../models';
import { doc } from '@firebase/firestore';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/reducers/tripReducers';
import { selectUser } from '../store/selectors/selectors';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  firestore = inject(Firestore);
  tripsCollection = collection(this.firestore, 'trips');

  userId$ = this.store.select(selectUser);
  userId = '';

  constructor(private store: Store<AppState>) {
    this.userId$.subscribe((userId) => {
      this.userId = userId ?? '';
    });
  }

  getTrips(): Observable<TripInterface[]> {
    const q = query(this.tripsCollection, where('userId', '==', this.userId));
    return collectionData(q, { idField: 'id' }) as Observable<TripInterface[]>;
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
    const docRef = doc(this.firestore, `trips/${trip.id}`);
    const promise = setDoc(docRef, trip);
    return from(promise);
  }
}
