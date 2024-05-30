import { createReducer, on } from '@ngrx/store';
import { eventInitialState } from '../state/event.state';
import {
  addEvent,
  addEventComplete,
  deleteEvent,
  deleteEventComplete,
  editEvent,
  editEventComplete,
  eventLoading,
  getEvents,
  getEventsComplete,
} from '../actions/event.actions';
import { editTripComplete } from '../actions';

export const eventReducer = createReducer(
  eventInitialState,
  on(addEvent, (state) => ({
    ...state,
    loading: true,
  })),
  on(addEventComplete, (state, { newEvent }) => ({
    ...state,
    events: [...state.events, newEvent],
    loading: false,
  })),
  on(getEvents, (state) => ({
    ...state,
    loading: true,
  })),
  on(getEventsComplete, (state, { events }) => ({
    ...state,
    events,
    loading: false,
  })),
  on(deleteEvent, (state) => ({
    ...state,
    loading: true,
  })),
  on(deleteEventComplete, (state, { eventId }) => ({
    ...state,
    events: state.events.filter((event) => event.id !== eventId),
    loading: false,
  })),
  on(editEvent, (state) => ({
    ...state,
    loading: true,
  })),
  on(editEventComplete, (state, { updatedEvent }) => ({
    ...state,
    events: state.events.map((event) =>
      event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
    ),
    loading: false,
  })),
  on(eventLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(editTripComplete, (state, { updatedTrip }) => ({
    ...state,
    events: state.events.map((event) =>
      event.tripId === updatedTrip.id
        ? { ...event, currency: updatedTrip.homeCurrency, }
        : event
    ),
  }))
);
