import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, retry, switchMap } from 'rxjs';
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
} from '../actions/event.actions';
import { EventInterface } from '../../models';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class EventsEffects {
  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEvent),
      switchMap(({ newEvent }) =>
        this.eventsService.addEvent(newEvent).pipe(
          retry(1),
          map((eventId) =>
            addEventComplete({
              newEvent: { ...(newEvent as EventInterface), id: eventId },
            })
          ),
          catchError((err) => {
            this.notificationService.error(
              `Failed to create a new event`,
              err.toString()
            );
            return EMPTY;
          })
        )
      )
    )
  );

  getEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEvents),
      switchMap((action) => {
        const tripId = action.tripId;
        return this.eventsService.getEvents(tripId).pipe(
          map((events) => getEventsComplete({ events })),
          catchError((err) => {
            console.log(err);
            this.notificationService.error(
              `Failed to fetch events`,
              err.toString()
            );
            return EMPTY;
          })
        );
      })
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEvent.type),
      switchMap(({ eventId }) =>
        this.eventsService.deleteEvent(eventId).pipe(
          map(() => deleteEventComplete({ eventId })),
          catchError((err) => {
            this.notificationService.error(
              `Failed to delete event`,
              err.toString()
            );
            return EMPTY;
          })
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
          catchError((err) => {
            this.notificationService.error(
              `Failed to edit event`,
              err.toString()
            );
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventService,
    private notificationService: NzNotificationService
  ) {}
}
