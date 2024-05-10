import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState, eventsFeatureKey } from '../state/event.state';

export const selectEventFeature =
  createFeatureSelector<EventState>(eventsFeatureKey);

export const selectEvents = createSelector(
  selectEventFeature,
  (state) => state.events
);

export const selectLoading = createSelector(
  selectEventFeature,
  (state) => state.loading
);
