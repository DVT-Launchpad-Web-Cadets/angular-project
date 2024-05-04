import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { DayService } from '../../services/day.service';
import { getDays, getDaysComplete } from '../actions/dayActions';

@Injectable()
export class DayEffects {
  getDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDays.type),
      switchMap(() =>
        this.dayService.getDays().pipe(
          map((days) => getDaysComplete({ days })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private dayService: DayService) {}
}
