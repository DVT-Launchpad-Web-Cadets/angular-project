import { Component, Input } from '@angular/core';
import { TagComponent } from "../../shared/tag/tag.component";

@Component({
    selector: 'app-budget-item',
    standalone: true,
    templateUrl: './budget-item.component.html',
    styleUrl: './budget-item.component.css',
    imports: [TagComponent]
})
export class BudgetItemComponent {
    @Input() category = "";
    @Input() percentage = "";
    @Input() cost = "";
    @Input() currency = "";
}
