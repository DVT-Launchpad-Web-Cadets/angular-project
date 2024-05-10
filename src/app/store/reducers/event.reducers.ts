import { createReducer, on } from '@ngrx/store';
import { eventInitialState } from '../state/event.state';
import {
  addEventComplete,
  deleteEventComplete,
  editEventComplete,
  getEventsComplete,
} from '../actions/event.actions';

export const eventReducer = createReducer(
  eventInitialState,
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
  })),
  on(editEventComplete, (state, { updatedEvent }) => ({
    ...state,
    trips: state.events.map((event) =>
      event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
    ),
  }))
);
