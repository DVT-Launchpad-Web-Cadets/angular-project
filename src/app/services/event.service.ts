import { Inject, Injectable, inject } from '@angular/core';
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
import { EventInterface } from '../models';
import { doc } from '@firebase/firestore';
import { TimeUtilService } from './time-util.service';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  firestore = inject(Firestore);
  eventsCollection = collection(this.firestore, 'events');

  getEvents(tripId: string): Observable<EventInterface[]> {
    const q = query(this.eventsCollection, where('tripId', '==', tripId));
    const collectiondData$ = collectionData(q, { idField: 'id' }) as Observable<
      EventInterface[]
    >;

    return collectiondData$.pipe(
      map((events) =>
        events.map((event) => ({
          ...event,
          startTime: this.timeUtilService.firebaseTimestampToDate(event.startTime),
          endTime: this.timeUtilService.firebaseTimestampToDate(event.endTime),
        }))
      )
    );
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

  constructor(private timeUtilService: TimeUtilService) {}
}
