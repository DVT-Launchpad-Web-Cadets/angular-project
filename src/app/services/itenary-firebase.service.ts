import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  constructor() { }
}