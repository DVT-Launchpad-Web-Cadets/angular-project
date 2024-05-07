import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { DayService } from '../../services/day.service';
import {
    addDay,
  addDayComplete,
  getDays,
  getDaysComplete,
  setDays,
  setDaysComplete,
} from '../actions/dayActions';
import { DayInterface } from '../../models';

@Injectable()
export class DayEffects {
  getDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDays.type),
      switchMap((tripId) =>
        this.dayService.getDays(tripId).pipe(
          map((days) => getDaysComplete({ days })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDay.type),
      switchMap(({ newDay }) =>
        this.dayService.addDay(newDay).pipe(
          map((dayId) => addDayComplete({ newDay: { ...(newDay as DayInterface), id: dayId } })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private dayService: DayService) {}
}
