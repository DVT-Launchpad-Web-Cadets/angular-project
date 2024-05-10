import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from '../state/auth.state';

export const selectAuthFeature =
  createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser = createSelector(
  selectAuthFeature,
  (state) => state.userId
);
