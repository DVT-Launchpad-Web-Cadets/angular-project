import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { TripInterface } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItenaryFirebaseService {
  firestore = inject(Firestore);
  itenariesCollection = collection(this.firestore, 'itenaries');
  
  getItenaries(): Observable<TripInterface[]> {
    return collectionData(this.itenariesCollection, { idField: 'id'}) as Observable<TripInterface[]>;
  }

  addTrip(name: string): Observable<string> {
    const itenaryCreate = {name};
    const promise = addDoc(this.itenariesCollection, itenaryCreate).then((response) => response.id);
    return from(promise);
  }
  constructor() { }
}