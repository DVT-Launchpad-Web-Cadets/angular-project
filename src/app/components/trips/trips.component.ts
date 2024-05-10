import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TripCardComponent } from './trip-card/trip-card.component';
import { MatIconModule } from '@angular/material/icon';
import { AddTripFormComponent } from '../shared/add-trip-form/add-trip-form.component';
import { Store } from '@ngrx/store';
import { getTrips, selectTrip } from '../../store/actions/trip.actions';
import { RouterModule } from '@angular/router';
import { AuthState, TripState } from '../../store/state';
import { selectTripLoading, selectTrips } from '../../store/selectors';
import { TripInterface } from '../../models';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matExitToApp } from '@ng-icons/material-icons/baseline';
import { logout } from '../../store/actions';

@Component({
  selector: 'app-trips',
  standalone: true,
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
  imports: [
    TripCardComponent,
    MatIconModule,
    AddTripFormComponent,
    AsyncPipe,
    RouterModule,
    NzSpinModule,
    NgIconComponent
  ],
  viewProviders: [
    provideIcons({
      matExitToApp
    }),
  ],
})
export class TripsComponent {
  selectedTrips$ = this.tripStore.select(selectTrips);
  loading$ = this.tripStore.select(selectTripLoading);

  constructor(private tripStore: Store<TripState>, private authStore: Store<AuthState>) {
    this.tripStore.dispatch(getTrips());
  }

  setTrip(trip: TripInterface) {
    this.tripStore.dispatch(selectTrip({ trip }));
  }

  logout() {
    this.authStore.dispatch(logout())
  }
}
