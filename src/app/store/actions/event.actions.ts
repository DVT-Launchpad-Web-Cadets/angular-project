import { createAction, props } from '@ngrx/store';
import { EventInterface } from '../../models';

export const getEvents = createAction(
  '[EVENTS] getEvents',
  props<{ tripId: string }>()
);

export const getEventsComplete = createAction(
  '[EVENTS] getEventsComplete',
  props<{ events: EventInterface[] }>()
);

export const addEvent = createAction(
  '[EVENTS] addEvent',
  props<{ newEvent: EventInterface }>()
);

export const addEventComplete = createAction(
  '[EVENTS] addEventComplete',
  props<{ newEvent: EventInterface }>()
);

export const deleteEvent = createAction(
  '[EVENTS] deleteEvent',
  props<{ eventId: string }>()
);

export const deleteEventComplete = createAction(
  '[EVENTS] deleteEventComplete',
  props<{ eventId: string }>()
);

export const editEvent = createAction(
  '[EVENTS] editEvent',
  props<{ updatedEvent: EventInterface }>()
);

export const editEventComplete = createAction(
  '[EVENTS] editEventComplete',
  props<{ updatedEvent: EventInterface }>()
);

export const eventLoading = createAction(
  '[EVENTS] eventLoading',
  props<{ loading: boolean }>()
);