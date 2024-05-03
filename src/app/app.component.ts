import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AuthService } from './services/auth.service';
import { ItenaryComponent } from "./components/itenary/itenary.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, LoginComponent, SignupComponent, ItenaryComponent]
})

export class AppComponent implements OnInit{
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email ?? '',
          username: user.displayName ?? '',
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
    });
  }
  title = 'Angular-Project';
}
