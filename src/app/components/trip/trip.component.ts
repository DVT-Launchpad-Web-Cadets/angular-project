import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../menu/menu.component';
import { matSettings, matLocationOn, matArrowBack, matCalendarMonth } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [MatIconModule, MenuComponent, NgIconComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
  viewProviders: [provideIcons({ matSettings, matLocationOn, matArrowBack, matCalendarMonth })],
})
export class TripComponent {
  name = 'Scotland Holiday';
  startDate = '29 Dec 2024';
  endDate = '10 Jan 2025';
  location = 'Scotland';
}
