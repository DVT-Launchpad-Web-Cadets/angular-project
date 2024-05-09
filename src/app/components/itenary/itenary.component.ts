import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTrips } from '../../store/actions/trip.actions';

import { AsyncPipe } from '@angular/common';
import { EventComponent } from '../day/event/event.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {
  matEdit,
  matLocationOn,
  matAdd,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AddTripFormComponent } from '../add-trip-form/add-trip-form.component';
import { ActivatedRoute } from '@angular/router';
import { DayComponent } from '../day/day.component';
import { DayInterface, TripInterface } from '../../models';
import createDays from '../../utils/createDays-utils';
import { TripState } from '../../store/state';
import { selectSelectedTrip } from '../../store/selectors';

@Component({
  selector: 'app-itenary',
  standalone: true,
  templateUrl: './itenary.component.html',
  styleUrl: './itenary.component.css',
  viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd })],
  imports: [
    AsyncPipe,
    EventComponent,
    NzTabsModule,
    NzRadioModule,
    NzInputNumberModule,
    NgIconComponent,
    AddTripFormComponent,
    DayComponent,
  ],
})
export class ItenaryComponent implements OnInit {
  selectedTrip$ = this.store.select(selectSelectedTrip);

  tripId = '';
  daysBetween: DayInterface[] = [];
  trip: TripInterface | null = null;

  constructor(private store: Store<TripState>, private route: ActivatedRoute) {
    this.store.dispatch(getTrips());
  }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];

    this.selectedTrip$.subscribe((trip) => {
      if (trip?.id === this.tripId) {
        this.trip = trip;
        this.daysBetween = createDays(trip.startDate, trip.endDate);
      }
    });
  }
}
