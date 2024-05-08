import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginComplete,
  logout,
  logoutComplete,
  signUp,
  signUpComplete,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap(({ email, username, password }) =>
        this.authService.signUp(email, username, password).pipe(
          map((userId) => signUpComplete({ userId })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((userId) => loginComplete({ userId })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => logoutComplete()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
