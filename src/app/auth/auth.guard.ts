import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppState } from '../store/reducers/tripReducers';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../store/selectors/selectors';
import { map } from 'rxjs';

export const authGuard = () => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.pipe(
    select(selectUser),
    map((user) => {
      if (!user) {
        router.navigateByUrl('/');
        return false;
      }
      return true;
    })
  )
}