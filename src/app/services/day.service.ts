import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { DayInterface } from '../models';
import { selectSelectedTrip } from '../store/selectors/selectors';
import { AppState } from '../store/reducers/tripReducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  selectedTrip$ = this.store.select(selectSelectedTrip);
  selectedTripId = '';

  constructor(private store: Store<AppState>) {
    this.selectedTrip$.subscribe((trip) => {
      this.selectedTripId = trip?.id ?? '';
    });
  }

  firestore = inject(Firestore);
  daysCollection = collection(this.firestore, 'days');

  getDays(tripId: string): Observable<DayInterface[]> {
    const q = query(
      this.daysCollection,
      where('tripId', '==', tripId)
    );

    return collectionData(q, { idField: 'id' }) as Observable<DayInterface[]>;
  }

  addDay(day: DayInterface): Observable<string> {
    const q = query(
      this.daysCollection,
      where('date', '==', day.date),
      where('tripId', '==', day.tripId)
    );
    if (!collectionData(q)) {
      // I want to check if day already exists in the collection
      return from(Promise.resolve(''));
    }
    const promise = addDoc(this.daysCollection, day).then(
      (response) => response.id
    );
    return from(promise);
  }

  setDays(days: DayInterface[]): void {
    days.map((day) => {
      addDoc(this.daysCollection, day);
    });
  }
}
