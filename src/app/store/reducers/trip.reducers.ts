import { createReducer, on } from '@ngrx/store';
import {
  addTripComplete,
  deleteTripComplete,
  editTripComplete,
  getTripsComplete,
  selectTripComplete,
} from '../actions/trip.actions';
import { tripInitialState } from '../state/trip.state';

export const tripReducer = createReducer(
  tripInitialState,
  on(addTripComplete, (state, { newTrip }) => ({
    ...state,
    trips: [...state.trips, newTrip],
    selectedTrip: newTrip,
  })),
  on(getTripsComplete, (state, { trips }) => ({
    ...state,
    trips,
  })),
  on(deleteTripComplete, (state, { tripId }) => ({
    ...state,
    trips: state.trips.filter((trip) => trip.id !== tripId),
    selectedTrip: null,
  })),
  on(editTripComplete, (state, { updatedTrip }) => ({
    ...state,
    trips: state.trips.map((trip) =>
      trip.id === updatedTrip.id ? { ...trip, ...updatedTrip } : trip
    ),
    selectedTrip: updatedTrip,
  })),
  on(selectTripComplete, (state, { trip }) => ({
    ...state,
    selectedTrip: trip
  }))
);
