import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { ItenaryInterface } from '../models/Itenary';

@Injectable({
  providedIn: 'root'
})
export class ItenaryFirebaseService {
  firestore = inject(Firestore);
  itenariesCollection = collection(this.firestore, 'itenaries');
  
  getItenaries(): Observable<ItenaryInterface[]> {
    return collectionData(this.itenariesCollection, { idField: 'id'}) as Observable<ItenaryInterface[]>;
  }

  addTrip(name: String): Observable<string> {
    const itenaryCreate = {name};
    const promise = addDoc(this.itenariesCollection, itenaryCreate).then((response) => response.id);
    return from(promise);
  }
  constructor() { }
}