import { Component } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NzCalendarModule, NzBadgeModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  // logic for calendar coming soon
}
