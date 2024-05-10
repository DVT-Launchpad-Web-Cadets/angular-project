import { createReducer, on } from '@ngrx/store';
import { authInitialState } from '../state/auth.state';
import {
  loginComplete,
  logoutComplete,
  signUpComplete,
  login
} from '../actions/auth.actions';

export const authReducer = createReducer(
  authInitialState,
  on(login, (state) => ({
    ...state,
    loading: true,
  })),
  on(loginComplete, (state, { userId }) => ({
    ...state,
    userId,
    loading: false,
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
