import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapChevronRight } from '@ng-icons/bootstrap-icons';
import { matLocationOn } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [MatIconModule, NgIconComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
  viewProviders: [provideIcons({ bootstrapChevronRight, matLocationOn })]
})
export class DayComponent {

}

