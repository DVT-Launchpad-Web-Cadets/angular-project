import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TripsComponent } from './components/trips/trips.component';
import { ItenaryComponent } from './components/itenary/itenary.component';
import { TripComponent } from './components/trip/trip.component';
import { DayItenaryComponent } from './components/day-itenary/day-itenary.component';
import { AppPageComponent } from './components/app-page/app-page.component';
import { AddItenaryItemFormComponent } from './components/itenary/add-itenary-item-form/add-itenary-item-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: AppPageComponent },
  { path: 'myTrips', component: TripsComponent },
  { path: 'trip/:tripId', component: TripComponent },
  { path: 'trip/:tripId/dayItenary/:dayId', component: DayItenaryComponent },
  { path: 'itenary', component: ItenaryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent}
];
