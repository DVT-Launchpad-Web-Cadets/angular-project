import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [MatIconModule, MenuComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent {
  name = 'Scotland Holiday';
  startDate = '29 Dec 2024';
  endDate = '10 Jan 2025';
  location = 'Scotland';
}
