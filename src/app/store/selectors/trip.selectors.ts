import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState, tripsFeatureKey } from '../state/trip.state';
import { TripInterface } from '../../models';

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

export const selectCurrencyInfo = createSelector(
  selectTripFeature,
  (state) =>{
    return {
      homeCurrency: state.selectedTrip?.homeCurrency,
      homeCurrencySymbol: state.selectedTrip?.homeCurrencySymbol,
      destinationCurrency: state.selectedTrip?.destinationCurrency,
      destinationCurrencySymbol: state.selectedTrip?.destinationCurrencySymbol,
      exchangeRate: state.selectedTrip?.exchangeRate
    }
  }
);