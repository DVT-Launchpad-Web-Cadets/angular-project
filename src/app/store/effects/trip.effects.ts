import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
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
  selectTrip,
  selectTripComplete,
} from '../actions/trip.actions';
import { TripInterface } from '../../models';
import { CurrencyService } from '../../services/currency.service';
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
  
  selectTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectTrip),
      tap(({ trip }) => {
        console.log('Selected trip:', trip);
      }),
      switchMap(({ trip }) =>
        this.currencyService.getCurrencyRates(trip.homeCurrency, trip.destinationCurrency).pipe(
          tap((currencyResponse) => {
            console.log('Currency response:', currencyResponse);
          }),
          map((currencyResponse) => {
            // Access the correct exchange rate from the currency response
            const exchangeRate = currencyResponse.data[trip.destinationCurrency].value;
            console.log('Exchange rate:', exchangeRate);
            // Update the trip with the exchange rate and return the action
            return selectTripComplete({
              trip: {
                ...(trip as TripInterface),
                exchangeRate: exchangeRate,
              },
            });
          }),
          catchError((error) => {
            console.error('Error fetching currency rates:', error);
            return EMPTY;
          })
        )
      )
    )
  );
  

  constructor(
    private actions$: Actions,
    private tripsService: TripService,
    private currencyService: CurrencyService
  ) {}
}
