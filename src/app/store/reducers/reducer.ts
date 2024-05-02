import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { TripInterface } from '../../models/trip';
import { DayInterface } from '../../models/day';
import { getTrips, getTripsComplete } from '../actions/actions';

export const tripsFeatureKey = 'trips';

const trip: TripInterface = {
  id: 1,
  name: 'Trip 2',
  startDate: "11/02/12202",
  endDate: "11/02/12202",
  userId: 1,
  location: 'Location 1',
};


export interface AppState {
  userId: number;
  trips: TripInterface[];
  selectedTrip: TripInterface | null;
  days: DayInterface[];
}

const initialState: AppState = {
    userId: 0,
    trips: [trip],
    selectedTrip: null,
    days: []
}

export const appReducer = createReducer(
  initialState,
  on(getTripsComplete, (state, {trips}) => ({
    ...state,
    trips
  })
),
);
