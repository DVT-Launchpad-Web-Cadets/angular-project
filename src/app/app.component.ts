import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AuthService } from './services/auth.service';
import { ItenaryComponent } from "./components/itenary/itenary.component";
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, LoginComponent, SignupComponent, ItenaryComponent]
})

export class AppComponent implements OnInit{
  authService = inject(AuthService);

  private userSubscription: Subscription | undefined;


  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
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

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.authService.currentUserSig.set(null);
  }
  title = 'Angular-Project';
}
