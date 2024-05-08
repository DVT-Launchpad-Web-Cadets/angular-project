import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  constructor(private store: Store<AuthState>) {}

  onSubmit(): void {
    const { email, username, password } = this.form.getRawValue();
    this.store.dispatch(signUp({ email, username, password }));
    this.router.navigate(['/myTrips']);
  }
}
