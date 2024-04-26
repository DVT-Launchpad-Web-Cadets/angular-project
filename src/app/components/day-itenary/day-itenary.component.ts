import { Component } from '@angular/core';
import { TagComponent } from "../shared/tag/tag.component";
import { matAirplanemodeActive, matShoppingBag, matHotel, matRestaurant, matCameraAlt, matDirectionsRun, matLocalFlorist, matCoffee, matTrain, matQuestionMark } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'app-day-itenary',
    standalone: true,
    templateUrl: './day-itenary.component.html',
    styleUrl: './day-itenary.component.css',
    imports: [TagComponent, NgIconComponent],
    viewProviders: [provideIcons({ matAirplanemodeActive, matShoppingBag, matHotel, matRestaurant, matCameraAlt, matDirectionsRun, matLocalFlorist, matCoffee, matTrain, matQuestionMark })]

})
export class DayItenaryComponent {

}
