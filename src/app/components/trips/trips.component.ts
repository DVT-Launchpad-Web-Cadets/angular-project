import { Component } from '@angular/core';
import { TripCardComponent } from "./trip-card/trip-card.component";
import { MatIconModule } from '@angular/material/icon';
import { AddTripFormComponent } from "../add-trip-form/add-trip-form.component";

@Component({
    selector: 'app-trips',
    standalone: true,
    templateUrl: './trips.component.html',
    styleUrl: './trips.component.css',
    imports: [TripCardComponent, MatIconModule, AddTripFormComponent]
})
export class TripsComponent {
    trips = [
        { id: '1', name: 'Scotland Trip', startDate: '2024-05-01', endDate: '2024-05-05', location: 'Scotland' },
        { id:'2', name: 'We are going to Paris', startDate: '2024-06-01', endDate: '2024-06-05', location: 'France, Paris' },
      ];
}
