import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';
import { EventState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../store/selectors';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  zoom = 5;
  directionsResult: google.maps.DirectionsResult | undefined;
  markerPosition: google.maps.LatLng | undefined;
  selectedEvents$ = this.store.select(selectEvents);

  constructor(
    private directionsService: MapDirectionsService,
    private store: Store<EventState>
  ) {}

  ngOnInit() {
    this.selectedEvents$.subscribe(events => {
      const waypoints = events.map(event => ({
        location: new google.maps.LatLng(event.latitude ?? 0, event.longitude),
        stopover: true
      }));

      console.log(waypoints);

      if (waypoints.length > 0) {
        this.getDirectionsWithWaypoints(waypoints);
      }
    });
  }

  getDirectionsWithWaypoints(waypoints: google.maps.DirectionsWaypoint[]) {
    const request: google.maps.DirectionsRequest = {
      origin: waypoints.shift()?.location ?? '',
      destination: waypoints.pop()?.location ?? '',
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: waypoints
    };

    console.log("request: ", request);
  
    this.directionsService.route(request).pipe(
      map(res => res.result)
    ).subscribe(result => {
      if (result && result.routes && result.routes.length > 0 && result.routes[0].overview_path) {
        this.directionsResult = result;
        this.markerPosition = result.routes[0].overview_path[0];
      } else {
        console.error('Invalid directions result:', result);
        // Handle the error case, e.g., show an error message or take appropriate action
      }
    });
  }
}