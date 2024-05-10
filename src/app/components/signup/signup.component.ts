import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Store } from '@ngrx/store';
import { signUp } from '../../store/actions';
import { AuthState } from '../../store/state';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  router = inject(Router);

  validateForm: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<AuthState>
  ) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      this.store.dispatch(
        signUp({
          email: this.validateForm.value.email!,
          username: this.validateForm.value.username!,
          password: this.validateForm.value.password!,
        })
      );
      this.router.navigate(['/myTrips']);
    } else {
      this.validateForm.markAllAsTouched();
      console.log(this.validateForm);
    }
  }
}
