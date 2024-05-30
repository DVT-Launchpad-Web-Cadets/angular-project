import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Store } from '@ngrx/store';
import { signUp } from '../../store/actions';
import { AuthState } from '../../store/state';
import { selectUser } from '../../store/selectors';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnDestroy {
  router = inject(Router);

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  selectedUser$ = this.store.select(selectUser);
  private userSubscription: Subscription | undefined;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<AuthState>
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      this.store.dispatch(
        signUp({
          email: this.validateForm.value.email!,
          password: this.validateForm.value.password!,
        })
      );
      this.userSubscription = this.selectedUser$
        .pipe(filter((userId) => !!userId))
        .subscribe(() => {
          this.router.navigate(['/my-trips']);
        });
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
