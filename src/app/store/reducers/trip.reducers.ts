import { createReducer, on } from '@ngrx/store';
import {
  addTripComplete,
  deleteTripComplete,
  editTripComplete,
  getTripsComplete,
  selectTripComplete,
  addTrip,
  deleteTrip,
  editTrip,
  getTrips,
  selectTrip,
  tripLoading,
} from '../actions/trip.actions';
import { tripInitialState } from '../state/trip.state';

export const tripReducer = createReducer(
  tripInitialState,
  on(addTrip, (state) => ({
    ...state,
    loading: false,
  })),
  on(addTripComplete, (state, { newTrip }) => ({
    ...state,
    trips: [...state.trips, newTrip],
    selectedTrip: newTrip,
    loading: true,
  })),
  on(getTrips, (state) => ({
    ...state,
    loading: true,
  })),
  on(getTripsComplete, (state, { trips }) => ({
    ...state,
    trips,
    loading: false,
  })),
  on(deleteTrip, (state) => ({
    ...state,
    loading: true,
  })),
  on(deleteTripComplete, (state, { tripId }) => ({
    ...state,
    trips: state.trips.filter((trip) => trip.id !== tripId),
    selectedTrip: null,
    loading: false,
  })),
  on(editTrip, (state) => ({
    ...state,
    loading: true,
  })),
  on(editTripComplete, (state, { updatedTrip }) => ({
    ...state,
    trips: state.trips.map((trip) =>
      trip.id === updatedTrip.id ? { ...trip, ...updatedTrip } : trip
    ),
    selectedTrip: updatedTrip,
    loading: false,
  })),
  on(selectTrip, (state) => ({
    ...state,
    loading: true,
  })),
  on(selectTripComplete, (state, { trip }) => ({
    ...state,
    selectedTrip: trip,
    loading: false,
  })),
  on(tripLoading, (state, { loading }) => ({
    ...state,
    loading,
  }))
);
