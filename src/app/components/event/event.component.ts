import { Component } from '@angular/core';
import { TagComponent } from "../shared/tag/tag.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matKeyboardArrowDown } from '@ng-icons/material-icons/baseline';

@Component({
    selector: 'app-event',
    standalone: true,
    templateUrl: './event.component.html',
    styleUrl: './event.component.css',
    imports: [TagComponent, NgIconComponent],
    viewProviders: [provideIcons({ matKeyboardArrowDown })]
})
export class EventComponent {
    currency = '$';
    currencyCost = '259';
    randCost = '2 590';
}
