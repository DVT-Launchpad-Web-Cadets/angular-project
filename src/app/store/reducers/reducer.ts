import { isDevMode } from '@angular/core';
import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { TripInterface } from '../../models/trip';
import { DayInterface } from '../../models/day';
import { getTrips, getTripsComplete } from '../actions/actions';

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
  on(getTripsComplete, (state, { trips }) => ({
    ...state,
    trips,
  }))
);
