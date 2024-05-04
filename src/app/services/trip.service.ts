import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { TripInterface } from '../models';
import { doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  firestore = inject(Firestore);
  tripsCollection = collection(this.firestore, 'trips');

  getTrips(): Observable<TripInterface[]> {
    return collectionData(this.tripsCollection, {
      idField: 'id',
    }) as Observable<TripInterface[]>;
  }

  addTrip(trip: TripInterface): Observable<string> {
    const promise = addDoc(this.tripsCollection, trip).then(
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
