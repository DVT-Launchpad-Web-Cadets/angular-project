import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TripCardComponent } from './trip-card/trip-card.component';
import { MatIconModule } from '@angular/material/icon';
import { AddTripFormComponent } from '../shared/add-trip-form/add-trip-form.component';
import { Store } from '@ngrx/store';
import { getTrips, selectTrip } from '../../store/actions/trip.actions';
import { RouterModule } from '@angular/router';
import { TripState } from '../../store/state';
import { selectTrips } from '../../store/selectors';
import { TripInterface } from '../../models';

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

  constructor(private store: Store<TripState>) {
    this.store.dispatch(getTrips());
  }

  setTrip(trip: TripInterface) {
    this.store.dispatch(selectTrip({ trip }));
  }
}
