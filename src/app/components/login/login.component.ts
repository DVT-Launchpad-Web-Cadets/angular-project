import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignupButtonComponent } from '../shared/signup-button/signup-button.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/state';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule,
    SignupButtonComponent,
    NzFormModule,
    NzInputModule,
  ],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  constructor(private store: Store<AuthState>) {}

  onSubmit(): void {
    const { email, password } = this.form.getRawValue();
    this.store.dispatch(login({ email, password }));
    this.router.navigate(['/myTrips']);
  }
}
