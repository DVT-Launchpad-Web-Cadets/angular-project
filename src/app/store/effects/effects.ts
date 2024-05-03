import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  EMPTY,
  exhaustMap,
  map,
  retry,
  switchMap,
  tap,
} from 'rxjs';
import { TripService } from '../../services/trip.service';
import { getTrips, getTripsComplete } from '../actions/actions';

@Injectable()
export class TripsEffects {
  getTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTrips.type),
      tap(() => console.log('getTrips action dispatched')),
      switchMap(() =>
        this.tripsService.getTrips().pipe(
          map((trips) => getTripsComplete({ trips })),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tripsService: TripService
  ) {}
}
