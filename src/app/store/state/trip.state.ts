import { TripInterface } from '../../models';

export const tripsFeatureKey = 'trips';

export interface TripState {
  trips: TripInterface[];
  selectedTrip: TripInterface | null;
}

export const tripInitialState: TripState = {
  trips: [],
  selectedTrip: null,
};
