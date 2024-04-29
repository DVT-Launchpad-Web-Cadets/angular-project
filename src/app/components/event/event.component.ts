import { Component, Input } from '@angular/core';
import { TagComponent } from "../shared/tag/tag.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matKeyboardArrowDown, matDelete, matEdit } from '@ng-icons/material-icons/baseline';

@Component({
    selector: 'app-event',
    standalone: true,
    templateUrl: './event.component.html',
    styleUrl: './event.component.css',
    imports: [TagComponent, NgIconComponent],
    viewProviders: [provideIcons({ matKeyboardArrowDown, matDelete, matEdit })]
})
export class EventComponent {
    @Input() currency = '$';
    @Input() currencyCost = '259';
    @Input() randCost = '2 590';
    @Input() startTime = '10:00';
    @Input() endTime = '11:30';
    @Input() editMode = false;
}
