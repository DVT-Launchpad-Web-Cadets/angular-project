import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TripCardComponent } from './trip-card/trip-card.component';
import { MatIconModule } from '@angular/material/icon';
import { AddTripFormComponent } from '../add-trip-form/add-trip-form.component';
import { AppState } from '../../store/reducers/tripReducers';
import { Store } from '@ngrx/store';
import { getTrips, selectTrip } from '../../store/actions/tripActions';
import { selectTrips } from '../../store/selectors/selectors';
import { RouterModule } from '@angular/router';

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
  ],
})
export class TripsComponent {
  selectedTrips$ = this.store.select(selectTrips);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getTrips());
  }

  setTrip(tripId: string) {
    this.store.dispatch(selectTrip({ tripId }));
  }
}
