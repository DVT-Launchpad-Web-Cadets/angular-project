import { Component, Input } from '@angular/core';
import { TagComponent } from '../../shared/tag/tag.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matKeyboardArrowDown,
  matDelete,
  matEdit,
} from '@ng-icons/material-icons/baseline';
import { EventInterface } from '../../../models';
import { EventFormComponent } from '../event-form/event-form.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { Store } from '@ngrx/store';
import { deleteEvent } from '../../../store/actions/event.actions';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EventState, TripState } from '../../../store/state';
import { selectCurrencyInfo } from '../../../store/selectors';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  viewProviders: [provideIcons({ matKeyboardArrowDown, matDelete, matEdit })],
  imports: [
    TagComponent,
    NgIconComponent,
    EventFormComponent,
    NzPopoverModule,
    NzPopconfirmModule,
    AsyncPipe,
    DecimalPipe
  ],
})
export class EventComponent {
  @Input() editMode = true;
  @Input() event: EventInterface | undefined;

  selectedCurrencyInfo$ = this.tripStore.select(selectCurrencyInfo);

  constructor(
    private eventStore: Store<EventState>,
    private tripStore: Store<TripState>,
    private nzMessageService: NzMessageService
  ) {}

  deleteEvent(eventId: string) {
    this.eventStore.dispatch(deleteEvent({ eventId }));
    this.nzMessageService.info('event deleted');
  }
}
