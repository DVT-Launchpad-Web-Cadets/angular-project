import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TripsComponent } from './components/trips/trips.component';
import { ItenaryComponent } from './components/itenary/itenary.component';
import { TripComponent } from './components/trip/trip.component';

export const routes: Routes = [
  { path: 'myTrips', component: TripsComponent },
  { path: 'trip/:id', component: TripComponent },
  { path: 'itenary', component: ItenaryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
