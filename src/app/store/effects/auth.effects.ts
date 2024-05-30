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
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap(({ email, password }) =>
        this.authService.signUp(email,  password).pipe(
          map((userId) => signUpComplete({ userId })),
          catchError((err) => {
            this.notificationService.error(
              `Failed to create account`,
              err.toString()
            );
            return EMPTY;
          })
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
          catchError((err) => {
            this.notificationService.error(
              `Failed to login`,
              err.toString()
            );
            return EMPTY;
          })
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
          catchError((err) => {
            this.notificationService.error(
              `Failed to logout`,
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
    private authService: AuthService,
    private notificationService: NzNotificationService
  ) {}
}
