import { createAction, props } from '@ngrx/store';
import { DayInterface, EventInterface } from '../../models';

export const getDays = createAction('[DAYS] getDays');

export const getDaysComplete = createAction(
  '[DAYS] getDaysComplete',
  props<{ days: DayInterface[] }>()
);

export const setCurrentDAy = createAction(
  '[DAYS] setCurrentDay',
  props<{ day: DayInterface }>()
);