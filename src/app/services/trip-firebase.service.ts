import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TripInterface } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TripFirebaseService {
  firestore = inject(Firestore);
  itenariesCollection = collection(this.firestore, 'trips');
  
  getTrips(): Observable<TripInterface[]> {
    console.log('getTrips called');
    return collectionData(this.itenariesCollection, { idField: 'id'}) as Observable<TripInterface[]>;
  }

  constructor() { }
}