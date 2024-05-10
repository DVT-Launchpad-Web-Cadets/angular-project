import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  matAirplanemodeActive,
  matShoppingBag,
  matHotel,
  matRestaurant,
  matCameraAlt,
  matDirectionsRun,
  matCoffee,
  matTrain,
  matQuestionMark,
  matTheaterComedy,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { TagType } from '../../../models';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
  viewProviders: [
    provideIcons({
      matAirplanemodeActive,
      matShoppingBag,
      matHotel,
      matRestaurant,
      matCameraAlt,
      matDirectionsRun,
      matCoffee,
      matTrain,
      matQuestionMark,
      matTheaterComedy,
    }),
  ],
})
export class TagComponent {
  @Input() tagName: TagType = 'Other';
  @Input() tagLabel = '';
  @Input() dark = false;
  @Output() tagClick: EventEmitter<string> = new EventEmitter<string>();

  icon = '';

  ngOnInit() {
    this.handleTag();
  }

  handleTag() {
    switch (this.tagName as TagType) {
      case 'Transport':
        this.icon = 'matTrain';
        break;
      case 'Entertainment':
        this.icon = 'matTheaterComedy;';
        break;
      case 'Lodging':
        this.icon = 'matHotel';
        break;
      case 'Activity':
        this.icon = 'matDirectionsRun';
        break;
      case 'Coffee':
        this.icon = 'matCoffee';
        break;
      case 'Flight':
        this.icon = 'matAirplanemodeActive';
        break;
      case 'Shopping':
        this.icon = 'matShoppingBag';
        break;
      case 'Food':
        this.icon = 'matRestaurant';
        break;
      case 'Historical':
        this.icon = 'matCameraAlt';
        break;
      case 'Other':
        this.icon = 'matQuestionMark';
        break;
      default:
        this.icon = 'matQuestionMark';
        break;
    }
  }

  handleClick() {
    this.tagClick.emit(this.tagName);
  }
}
