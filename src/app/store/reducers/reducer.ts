import { createReducer, on } from '@ngrx/store';
import { TripInterface } from '../../models/trip';
import { DayInterface } from '../../models/day';
import {
  addTrip,
  deleteTripComplete,
  editTripComplete,
  getTripsComplete,
} from '../actions/tripActions';

export const tripsFeatureKey = 'trips';

export interface AppState {
  userId: number | null;
  trips: TripInterface[];
  selectedTrip: TripInterface | null;
  days: DayInterface[];
}

const initialState: AppState = {
  userId: null,
  trips: [],
  selectedTrip: null,
  days: [],
};

export const appReducer = createReducer(
  initialState,
  on(addTrip, (state, { newTrip }) => ({
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
  }))
);
