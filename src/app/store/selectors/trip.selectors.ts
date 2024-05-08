import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState, tripsFeatureKey } from '../state/trip.state';

export const selectTripFeature =
  createFeatureSelector<TripState>(tripsFeatureKey);

export const selectTrips = createSelector(
  selectTripFeature,
  (state) => state.trips
);

export const selectSelectedTrip = createSelector(
  selectTripFeature,
  (state) => state.selectedTrip
);
