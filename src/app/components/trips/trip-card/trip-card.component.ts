import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent {
  @Input() name = '';
  @Input() startDate = '';
  @Input() endDate = '';
  @Input() location = '';
}
