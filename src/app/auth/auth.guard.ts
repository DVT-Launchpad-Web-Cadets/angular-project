import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthState } from '../store/state';
import { selectUser } from '../store/selectors';

export const authGuard = () => {
  const store = inject(Store<AuthState>);
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
  );
};
