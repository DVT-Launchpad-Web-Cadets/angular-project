import { createAction, props } from '@ngrx/store';
import { TripInterface } from '../../models';

export const getTrips = createAction('[TRIPS] getTrips');

export const getTripsComplete = createAction(
  '[TRIPS] getTripsComplete',
  props<{ trips: TripInterface[] }>()
);

export const addTrip = createAction(
  '[TRIPS] addTrip',
  props<{ newTrip: TripInterface }>()
);

export const addTripComplete = createAction(
  '[TRIPS] addTripComplete',
  props<{ newTrip: TripInterface }>()
);

export const deleteTrip = createAction(
  '[TRIPS] deleteTrip',
  props<{ tripId: string }>()
);

export const deleteTripComplete = createAction(
  '[TRIPS] deleteTripComplete',
  props<{ tripId: string }>()
);

export const editTrip = createAction(
  '[TRIPS] editTrip',
  props<{ updatedTrip: TripInterface }>()
);

export const editTripComplete = createAction(
  '[TRIPS] editTripComplete',
  props<{ updatedTrip: TripInterface }>()
);

export const selectTrip = createAction(
  '[TRIPS] selectTrip',
  props<{ tripId: string }>()
);
