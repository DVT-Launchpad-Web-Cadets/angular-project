import { Component, Input, input } from '@angular/core';
import {
  matEdit,
  matLocationOn,
  matAdd,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EventComponent } from "../event/event.component";
import { DayInterface, EventInterface } from '../../models';
import { AppState } from '../../store/reducers/tripReducers';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors/selectors';
import { EventFormComponent } from "./event-form/event-form.component";


@Component({
    selector: 'app-day',
    standalone: true,
    templateUrl: './day.component.html',
    styleUrl: './day.component.css',
    viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd })],
    imports: [NgIconComponent, EventComponent, EventFormComponent]
})
export class DayComponent {
 @Input() day : DayInterface | undefined;
 events: EventInterface[] = []; 

 ngOnInit(): void {
  this.events = this.day?.events || [];
}
  
}
