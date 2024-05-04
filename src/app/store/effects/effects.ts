import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { TripService } from '../../services/trip.service';
import { addTrip, addTripComplete, deleteTrip, deleteTripComplete, editTrip, editTripComplete, getTrips, getTripsComplete } from '../actions/tripActions';

@Injectable()
export class TripsEffects {
  addTrip$ = createEffect(() => this.actions$.pipe(
    ofType(addTrip),
    switchMap(({ newTrip }) => 
      this.tripsService.addTrip(newTrip).pipe(
        map((tripId) => addTripComplete({ newTrip: { ...newTrip, id: tripId } })),
        catchError(() => EMPTY)
      )
    )
  ));

  getTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTrips.type),
      switchMap(() =>
        this.tripsService.getTrips().pipe(
          map((trips) => getTripsComplete({ trips })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  
  deleteTrip$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTrip),
    switchMap(({ tripId }) => 
      this.tripsService.deleteTrip(tripId).pipe(
        map(() => deleteTripComplete({ tripId })),
        catchError(() => EMPTY)
      )
    )
  ));

  editTrip$ = createEffect(() => this.actions$.pipe(
    ofType(editTrip),
    switchMap(({ updatedTrip }) => 
      this.tripsService.editTrip(updatedTrip).pipe(
        map(() => editTripComplete({ updatedTrip })),
        catchError(() => EMPTY)
      )
    )
  ));

  constructor(private actions$: Actions, private tripsService: TripService) {}
}
