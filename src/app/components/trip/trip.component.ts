import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import {
  matSettings,
  matLocationOn,
  matArrowBack,
  matCalendarMonth,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AddTripFormComponent } from '../shared/add-trip-form/add-trip-form.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { TripState } from '../../store/state';
import { selectSelectedTrip } from '../../store/selectors';
import { DatePipe, AsyncPipe } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { RouterModule } from '@angular/router';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { featherEdit } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-trip',
  standalone: true,
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
  viewProviders: [
    provideIcons({
      matSettings,
      matLocationOn,
      matArrowBack,
      matCalendarMonth,
      featherEdit
    }),
  ],
  imports: [
    MenuComponent,
    NgIconComponent,
    AddTripFormComponent,
    CommonModule,
    DatePipe,
    AsyncPipe,
    NzSpinModule,
    RouterModule,
    LoadingPageComponent
  ],
})
export class TripComponent {
  selectedTrip$ = this.store.select(selectSelectedTrip);
  constructor(private store: Store<TripState>) {}
}
