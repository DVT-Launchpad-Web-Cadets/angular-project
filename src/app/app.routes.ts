import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TripsComponent } from './components/trips/trips.component';

export const routes: Routes = [
  { path: 'myTrips', component: TripsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
