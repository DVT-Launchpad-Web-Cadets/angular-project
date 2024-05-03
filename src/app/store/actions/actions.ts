import { createAction, props } from '@ngrx/store';
import { TripInterface } from '../../models';

export const getTrips = createAction('[TRIPS] getTrips');

export const getTripsComplete = createAction(
  '[TRIPS] getTripsComplete',
  props<{ trips: TripInterface[] }>()
);

export const addTrip = createAction(
  '[TRIPS] addTrip',
  props<{ trip: TripInterface }>()
);