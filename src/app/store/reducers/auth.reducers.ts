import { createReducer, on } from '@ngrx/store';
import { authInitialState } from '../state/auth.state';
import {
  loginComplete,
  logoutComplete,
  signUpComplete,
} from '../actions/auth.actions';

export const authReducer = createReducer(
  authInitialState,
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
