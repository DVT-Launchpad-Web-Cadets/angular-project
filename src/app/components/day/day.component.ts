import { Component, Input } from '@angular/core';
import {
  matEdit,
  matLocationOn,
  matAdd,
  matEditCalendar,
  matMap,
  matListAlt
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EventComponent } from './event/event.component';
import { DayInterface } from '../../models';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors';
import { EventFormComponent } from './event-form/event-form.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventState } from '../../store/state';
import { map } from 'rxjs';
import { MapComponent } from "../map/map.component";
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
    selector: 'app-day',
    standalone: true,
    templateUrl: './day.component.html',
    styleUrl: './day.component.css',
    viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd, matEditCalendar, matMap, matListAlt })],
    imports: [NgIconComponent, EventComponent, EventFormComponent, CommonModule, MapComponent,NzSwitchModule]
})
export class DayComponent {
  @Input() day: DayInterface | undefined;

  mapOpen = false;

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

  toggleMap(): void {
    this.mapOpen = !this.mapOpen;
  }
}
