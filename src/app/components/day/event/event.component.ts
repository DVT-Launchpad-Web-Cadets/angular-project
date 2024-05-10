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
import { EventState } from '../../../store/state';

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
  ],
})
export class EventComponent {
  @Input() editMode = true;
  @Input() event: EventInterface | undefined;

  currency = '$';
  randCost = 300; // dynamic code to be added when api is integrated

  constructor(
    private store: Store<EventState>,
    private nzMessageService: NzMessageService
  ) {}

  deleteEvent(eventId: string) {
    this.store.dispatch(deleteEvent({ eventId }));
    this.nzMessageService.info('event deleted');
  }
}
