import { Component, Input } from '@angular/core';
import { TagComponent } from "../shared/tag/tag.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matKeyboardArrowDown, matDelete, matEdit } from '@ng-icons/material-icons/baseline';
import { EventInterface } from '../../models';
import { EventFormComponent } from "../day/event-form/event-form.component";

@Component({
    selector: 'app-event',
    standalone: true,
    templateUrl: './event.component.html',
    styleUrl: './event.component.css',
    viewProviders: [provideIcons({ matKeyboardArrowDown, matDelete, matEdit })],
    imports: [TagComponent, NgIconComponent, EventFormComponent]
})
export class EventComponent {
    @Input() editMode = true;
    currency = '$';
    @Input() event: EventInterface | undefined;
    randCost = 300;
}
