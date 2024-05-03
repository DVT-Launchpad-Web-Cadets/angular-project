import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router =  inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const { email, password } = this.form.getRawValue();
    this.authService.login(email, password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}
