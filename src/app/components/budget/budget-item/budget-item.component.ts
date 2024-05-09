import { Component, Input } from '@angular/core';
import { TagComponent } from "../../shared/tag/tag.component";
import { TagType } from '../../../models';

@Component({
    selector: 'app-budget-item',
    standalone: true,
    templateUrl: './budget-item.component.html',
    styleUrl: './budget-item.component.css',
    imports: [TagComponent]
})
export class BudgetItemComponent {
    @Input() category : TagType = "Other";
    @Input() percentage = "";
    @Input() cost = 0;
    @Input() currency = "";
}
