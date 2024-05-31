import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { Observable, map } from 'rxjs';
import { EventState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors';
import { EventInterface } from '../../models';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() selectedEvents$?: Observable<EventInterface[]>;

  zoom = 5;
  directionsResult: google.maps.DirectionsResult | undefined;
  markerPosition: google.maps.LatLng | undefined;

  constructor(
    private directionsService: MapDirectionsService,
    private store: Store<EventState>
  ) {}

  ngOnInit() {
    if (this.selectedEvents$)
      this.selectedEvents$.subscribe((events) => {
        const waypoints: google.maps.LatLng[] = events.map((event) => {
          return new google.maps.LatLng(event.latitude ?? 0, event.longitude);
        });

        if (waypoints.length > 1) {
          this.getDirectionsWithWaypoints(waypoints);
        }
      });
  }

  getDirectionsWithWaypoints(waypoints: google.maps.LatLng[]) {
    if (waypoints.length < 2) {
      console.error('At least two waypoints are required for directions.');
      return;
    }

    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const waypointsRequest: google.maps.DirectionsWaypoint[] = waypoints
      .slice(1, -1)
      .map((waypoint) => ({ location: waypoint, stopover: true }));

    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: waypointsRequest,
      optimizeWaypoints: true,
    };

    this.directionsService
      .route(request)
      .pipe(map((res) => res.result))
      .subscribe((result) => {
        if (
          result &&
          result.routes &&
          result.routes.length > 0 &&
          result.routes[0].overview_path
        ) {
          this.directionsResult = result;
          this.markerPosition = result.routes[0].overview_path[0];
        } else {
          console.error('Invalid directions result:', result);
        }
      });
  }
}
