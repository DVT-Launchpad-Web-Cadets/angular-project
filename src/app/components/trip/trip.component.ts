import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { matSettings, matLocationOn, matArrowBack, matCalendarMonth } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AddTripFormComponent } from "../add-trip-form/add-trip-form.component";
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/tripReducers';
import { selectSelectedTrip } from '../../store/selectors/selectors';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-trip',
    standalone: true,
    templateUrl: './trip.component.html',
    styleUrl: './trip.component.css',
    viewProviders: [provideIcons({ matSettings, matLocationOn, matArrowBack, matCalendarMonth })],
    imports: [ MenuComponent, NgIconComponent, AddTripFormComponent, CommonModule]
})
export class TripComponent {

  selectedTrip$ = this.store.select(selectSelectedTrip);

  constructor(private store: Store<AppState>) {
  }


  name = 'Scotland Holiday';
  startDate = '29 Dec 2024';
  endDate = '10 Jan 2025';
  location = 'Scotland';
}
