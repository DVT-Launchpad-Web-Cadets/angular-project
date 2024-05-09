import { Component, Input, OnInit } from '@angular/core';
import {
  matEdit,
  matLocationOn,
  matAdd,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EventComponent } from './event/event.component';
import { DayInterface, EventInterface } from '../../models';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors';
import { EventFormComponent } from './event-form/event-form.component';
import { getEvents } from '../../store/actions/event.actions';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripState } from '../../store/state';
import { map } from 'rxjs';

@Component({
  selector: 'app-day',
  standalone: true,
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
  viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd })],
  imports: [NgIconComponent, EventComponent, EventFormComponent, CommonModule],
})
export class DayComponent implements OnInit {
  @Input() day: DayInterface | undefined;

  selectedEvents$ = this.store
    .select(selectEvents)
    .pipe(
      map((events) => events.filter((event) => event.date === this.day?.date))
    );

  edit = false;
  tripId = '';

  constructor(private store: Store<TripState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.store.dispatch(getEvents({ tripId: this.tripId }));
  }

  toggleEdit(): void {
    this.edit = !this.edit;
  }
}
