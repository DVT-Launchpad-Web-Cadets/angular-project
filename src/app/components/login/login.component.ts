import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
        login({
          email: this.validateForm.value.email!,
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
