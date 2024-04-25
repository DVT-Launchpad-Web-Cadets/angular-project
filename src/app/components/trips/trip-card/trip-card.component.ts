import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent {
  name = 'Trip to Paris';
  starDate = '02 April';
  endDate = '19 April 2024';
  location = 'Paris, France';
}
