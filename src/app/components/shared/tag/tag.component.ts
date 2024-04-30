import { Component, Input } from '@angular/core';
import { matAirplanemodeActive, matShoppingBag, matHotel, matRestaurant, matCameraAlt, matDirectionsRun, matLocalFlorist, matCoffee, matTrain, matQuestionMark } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
  viewProviders: [provideIcons({ matAirplanemodeActive, matShoppingBag, matHotel, matRestaurant, matCameraAlt, matDirectionsRun, matLocalFlorist, matCoffee, matTrain, matQuestionMark })]
})
export class TagComponent {
  @Input() tagName = '';
  @Input() tagLabel = '';
  @Input() dark = false;
  icon = '';

  ngOnInit() {
    this.handleTag();
  } 
  
  handleTag() {
    switch (this.tagName) {
      case "Transport":
        this.icon = "matTrain";
        break;
      case "Nature":
        this.icon = "matLocalFlorist;"
        break;
      case "Lodging":
        this.icon = "matHotel";
        break;
      case "Activity":
        this.icon = "matDirectionsRun";
        break;
      case "Coffee":
        this.icon = "matCoffee";
        break;
      case "Flights":
        this.icon = "matAirplanemodeActive";
        break;
      case "Shopping":
        this.icon = "matShoppingBag";
        break;
      case "Food":
        this.icon = "matRestaurant";
        break;
      case "Sightseeing":
        this.icon = "matCameraAlt";
        break;
      case "Other":
        this.icon = "matQuestionMark";
        break;
      default:
        this.icon = "matQuestionMark";
        break;
    }
  }
}
