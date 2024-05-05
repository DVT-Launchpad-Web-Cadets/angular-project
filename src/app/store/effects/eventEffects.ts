import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { EventService } from '../../services/event.service';
import {
  addEvent,
  addEventComplete,
  deleteEvent,
  deleteEventComplete,
  editEvent,
  editEventComplete,
  getEvents,
  getEventsComplete,
} from '../actions/eventActions';
import { EventInterface } from '../../models';

@Injectable()
export class EventsEffects {
  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEvent.type),
      switchMap(({ newEvent }) =>
        this.eventsService.addEvent(newEvent).pipe(
          map((eventId) =>
            addEventComplete({ newEvent: { ...(newEvent as EventInterface), id: eventId } })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEvents.type),
      switchMap(() =>
        this.eventsService.getEvents().pipe(
          map((events) => getEventsComplete({ events })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEvent.type),
      switchMap(({ eventId }) =>
        this.eventsService.deleteEvent(eventId).pipe(
          map(() => deleteEventComplete({ eventId })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  editEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editEvent.type),
      switchMap(({ updatedEvent }) =>
        this.eventsService.editEvent(updatedEvent).pipe(
          map(() => editEventComplete({ updatedEvent })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private eventsService: EventService) {}
}
