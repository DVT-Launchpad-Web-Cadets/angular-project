import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, tripsFeatureKey } from "../reducers/reducer";

export const selectFeature = createFeatureSelector<AppState>(tripsFeatureKey);

export const selectTrips = createSelector(
    selectFeature,
    (state) => state.trips
  );