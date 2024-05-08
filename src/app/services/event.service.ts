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
import { EventInterface } from '../models';
import { doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  firestore = inject(Firestore);
  eventsCollection = collection(this.firestore, 'events');

  getEvents(tripId: string): Observable<EventInterface[]> {
    const q = query(this.eventsCollection, where('tripId', '==', tripId));
    return collectionData(q, { idField: 'id' }) as Observable<EventInterface[]>;
  }

  addEvent(event: EventInterface): Observable<string> {
    const promise = addDoc(this.eventsCollection, event).then(
      (response) => response.id
    );
    return from(promise);
  }

  deleteEvent(eventId: string): Observable<void> {
    const docRef = doc(this.firestore, `events/${eventId}`);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  editEvent(event: EventInterface): Observable<void> {
    const docRef = doc(this.firestore, `events/${event.id}`);
    const promise = setDoc(docRef, event);
    return from(promise);
  }
}
