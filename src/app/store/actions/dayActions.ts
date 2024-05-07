import { createAction, props } from '@ngrx/store';
import { DayInterface } from '../../models';

export const getDays = createAction(
  '[DAYS] getDays',
  props<{ tripId: string }>()
);

export const getDaysComplete = createAction(
  '[DAYS] getDaysComplete',
  props<{ days: DayInterface[] }>()
);

export const setCurrentDay = createAction(
  '[DAYS] setCurrentDay',
  props<{ day: DayInterface }>()
);

export const setDays = createAction(
  '[DAYS] setDays',
  props<{ days: DayInterface[] }>()
);

export const setDaysComplete = createAction(
  '[DAYS] setDaysComplete',
  props<{ days: DayInterface[] }>()
);

export const addDay = createAction(
  '[DAYS] addDay',
  props<{ newDay: DayInterface }>()
);

export const addDayComplete = createAction(
  '[DAYS] addDayComplete',
  props<{ newDay: DayInterface }>()
);
