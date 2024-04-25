import { Component } from '@angular/core';
import { TripCardComponent } from "./trip-card/trip-card.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-trips',
    standalone: true,
    templateUrl: './trips.component.html',
    styleUrl: './trips.component.css',
    imports: [TripCardComponent, MatIconModule]
})
export class TripsComponent {

}
