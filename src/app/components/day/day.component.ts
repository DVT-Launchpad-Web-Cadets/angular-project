import { Component, Input, input } from '@angular/core';
import {
  matEdit,
  matLocationOn,
  matAdd,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EventComponent } from './event/event.component';
import { DayInterface, EventInterface } from '../../models';
import { AppState } from '../../store/reducers/tripReducers';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors/selectors';
import { EventFormComponent } from './event-form/event-form.component';
import { getEvents } from '../../store/actions/eventActions';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day',
  standalone: true,
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
  viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd })],
  imports: [NgIconComponent, EventComponent, EventFormComponent, CommonModule],
})
export class DayComponent {
  @Input() day: DayInterface | undefined;
  events: EventInterface[] = [];

  edit = false;

  selectedEvents$ = this.store.select(selectEvents);
  tripId = '';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.events = this.day?.events || [];
    this.tripId = this.route.snapshot.params['tripId'];
    this.store.dispatch(getEvents({ tripId: this.tripId }));

    this.selectedEvents$.subscribe((events) => {
      if (this.day) {
        this.events = events.filter((event) => event.date === this.day?.date);
      }
    });
  }

  toggleEdit(): void {
    this.edit = !this.edit;
  }
}
