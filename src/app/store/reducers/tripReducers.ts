import { createReducer, on } from '@ngrx/store';
import { TripInterface } from '../../models/trip';
import { DayInterface } from '../../models/day';
import {
  addTripComplete,
  deleteTripComplete,
  editTripComplete,
  getTripsComplete,
} from '../actions/tripActions';
import { getDaysComplete, setCurrentDay } from '../actions/dayActions';
import {
  addEventComplete,
  deleteEventComplete,
  editEventComplete,
  getEventsComplete,
} from '../actions/eventActions';
import { EventInterface } from '../../models';
import { loginComplete, logoutComplete, signUpComplete } from '../actions/authActions';

export const tripsFeatureKey = 'trips';

export interface AppState {
  userId: string | null;
  trips: TripInterface[];
  selectedTrip: TripInterface | null;
  days: DayInterface[];
  selectedDay: DayInterface | null;
  events: EventInterface[];
}

const initialState: AppState = {
  userId: null,
  trips: [],
  selectedTrip: null,
  days: [],
  selectedDay: null,
  events: [],
};

export const appReducer = createReducer(
  initialState,
  on(addTripComplete, (state, { newTrip }) => ({
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
    selectedTrip: updatedTrip,
  })),
  on(getDaysComplete, (state, { days }) => ({
    ...state,
    days,
  })),
  on(setCurrentDay, (state, { day }) => ({
    ...state,
    selectedDay: day,
  })),
  on(addEventComplete, (state, { newEvent }) => ({
    ...state,
    events: [...state.events, newEvent],
  })),
  on(getEventsComplete, (state, { events }) => ({
    ...state,
    events,
  })),
  on(deleteEventComplete, (state, { eventId }) => ({
    ...state,
    events: state.events.filter((event) => event.id !== eventId),
    selectedTrip: null,
  })),
  on(editEventComplete, (state, { updatedEvent }) => ({
    ...state,
    trips: state.trips.map((trip) =>
      trip.id === updatedEvent.id ? { ...trip, ...updatedEvent } : trip
    ),
  })),
  on(loginComplete, (state, { userId }) => ({
    ...state,
    userId,
  })),
  on(signUpComplete, (state, { userId }) => ({
    ...state,
    userId,
  })),
  on(logoutComplete, (state) => ({
    ...state,
    userId: null,
  }))
);
