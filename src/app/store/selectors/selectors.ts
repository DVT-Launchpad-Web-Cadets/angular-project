import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, tripsFeatureKey } from '../reducers/tripReducers';

export const selectFeature = createFeatureSelector<AppState>(tripsFeatureKey);

export const selectTrips = createSelector(
  selectFeature,
  (state) => state.trips
);

export const selectSelectedTrip = createSelector(
  selectFeature,
  (state) => state.selectedTrip
);

export const selectDays = createSelector(
  selectFeature,
  (state) => state.days
);

export const selectSelectedDay = createSelector(
  selectFeature,
  (state) => state.selectedDay
);

export const selectEvents = createSelector(
  selectFeature,
  (state) => state.events
);