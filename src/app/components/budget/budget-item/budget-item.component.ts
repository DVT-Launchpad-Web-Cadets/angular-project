import { Component, Input } from '@angular/core';
import { TagComponent } from "../../shared/tag/tag.component";
import { Tag } from '../../../models';

@Component({
    selector: 'app-budget-item',
    standalone: true,
    templateUrl: './budget-item.component.html',
    styleUrl: './budget-item.component.css',
    imports: [TagComponent]
})
export class BudgetItemComponent {
    @Input() category : Tag = "Other";
    @Input() percentage = "";
    @Input() cost = "";
    @Input() currency = "";
}
