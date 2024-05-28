import { Component, Input, OnInit } from '@angular/core';
import {
  matEdit,
  matLocationOn,
  matAdd,
  matEditCalendar
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EventComponent } from './event/event.component';
import { DayInterface } from '../../models';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors';
import { EventFormComponent } from './event-form/event-form.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventState, TripState } from '../../store/state';
import { map } from 'rxjs';

@Component({
  selector: 'app-day',
  standalone: true,
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
  viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd, matEditCalendar })],
  imports: [NgIconComponent, EventComponent, EventFormComponent, CommonModule],
})
export class DayComponent {
  @Input() day: DayInterface | undefined;

  selectedEvents$ = this.store
    .select(selectEvents)
    .pipe(
      map((events) => events.filter((event) => event.date === this.day?.date)),
      map(events => events.sort((a, b) => {
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      }))
    );

  edit = false;
  tripId = '';

  constructor(private store: Store<EventState>, private route: ActivatedRoute) {}

  toggleEdit(): void {
    this.edit = !this.edit;
  }
}
