import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-location-auto-complete',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, MatInputModule],
  templateUrl: './location-auto-complete.component.html',
  styleUrl: './location-auto-complete.component.css',
})
export class LocationAutoCompleteComponent {
  @Input() placeholder = '';
  @Output() placeSelected = new EventEmitter<PlaceSearchResult>();

  @ViewChild('inputField')
  inputField!: ElementRef;

  autoComplete: google.maps.places.Autocomplete | undefined;

  ngAfterViewInit() {
    this.autoComplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete?.getPlace();

      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        location: place?.geometry?.location,
        imageUrl: this.getPhotoUrl(place),
        iconUrl: place?.icon,
        name: place?.name,
      };
      this.placeSelected.emit(result);
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 })
      : undefined;
  }
}
