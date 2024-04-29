import { Component } from '@angular/core';
import { TagComponent } from "../shared/tag/tag.component";
import { matAirplanemodeActive, matShoppingBag, matHotel, matRestaurant, matCameraAlt, matDirectionsRun, matLocalFlorist, matCoffee, matTrain, matQuestionMark, matEdit, matClose, matLocationOn, matDeleteOutline } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EventComponent } from "../event/event.component";

@Component({
    selector: 'app-day-itenary',
    standalone: true,
    templateUrl: './day-itenary.component.html',
    styleUrl: './day-itenary.component.css',
    viewProviders: [provideIcons({ matAirplanemodeActive, matShoppingBag, matHotel, matRestaurant, matCameraAlt, matDirectionsRun, matLocalFlorist, matCoffee, matTrain, matQuestionMark, matEdit, matClose, matLocationOn, matDeleteOutline })],
    imports: [TagComponent, NgIconComponent, EventComponent]
})
export class DayItenaryComponent {
    date = 'Tuesday, 03 January';
    location = 'Add Location';
    cost = 'R2 590';
}
