import { Component } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { EventState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NzCalendarModule, NzBadgeModule, NzPopoverModule, AsyncPipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  events$ = this.store.select(selectEvents);

  constructor(private store: Store<EventState>) { }


  getDateFromString(dateString: string): { month: number, day: number } {
    const months: { [key: string]: number } = {
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11
    };

    const [monthName, dayStr] = dateString.split(' ');
    const month = months[monthName];
    const day = parseInt(dayStr, 10);
    return { month, day };
  }
}
