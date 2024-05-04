import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DayInterface } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor() { }

  firestore = inject(Firestore);
  daysCollection = collection(this.firestore, 'days');

  getDays(): Observable<DayInterface[]> {
    return collectionData(this.daysCollection, {
      idField: 'id',
    }) as Observable<DayInterface[]>;
  }
}
