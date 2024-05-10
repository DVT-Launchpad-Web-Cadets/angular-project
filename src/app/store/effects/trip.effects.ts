import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { TripService } from '../../services/trip.service';
import {
  addTrip,
  addTripComplete,
  deleteTrip,
  deleteTripComplete,
  editTrip,
  editTripComplete,
  getTrips,
  getTripsComplete,
} from '../actions/trip.actions';
import { TripInterface } from '../../models';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class TripsEffects {
  addTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTrip),
      switchMap(({ newTrip }) =>
        this.tripsService.addTrip(newTrip).pipe(
          map((tripId) =>
            addTripComplete({
              newTrip: { ...(newTrip as TripInterface), id: tripId },
            })
          ),
          catchError((err) => {
            this.notificationService.error(
              `Failed to create a new trip`,
              err.toString()
            );
            return EMPTY;
          })
        )
      )
    )
  );

  getTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTrips),
      switchMap(() =>
        this.tripsService.getTrips().pipe(
          map((trips) => getTripsComplete({ trips })),
          catchError((err) => {
            this.notificationService.error(
              `Failed to get trips`,
              err.toString()
            );
            return EMPTY;
          })
        )
      )
    )
  );

  deleteTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTrip),
      switchMap(({ tripId }) =>
        this.tripsService.deleteTrip(tripId).pipe(
          map(() => deleteTripComplete({ tripId })),
          catchError((err) => {
            this.notificationService.error(
              `Failed to delete trip`,
              err.toString()
            );
            return EMPTY;
          })
        )
      )
    )
  );

  editTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTrip),
      switchMap(({ updatedTrip }) =>
        this.tripsService.editTrip(updatedTrip).pipe(
          map(() => editTripComplete({ updatedTrip })),
          catchError((err) => {
            this.notificationService.error(
              `Failed to edit trip`,
              err.toString()
            );
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tripsService: TripService,
    private notificationService: NzNotificationService
  ) {}
}
