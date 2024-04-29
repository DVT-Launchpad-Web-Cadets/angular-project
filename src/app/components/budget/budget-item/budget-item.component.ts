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
    @Input() category = "Food";
    @Input() percentage = "12";
    @Input() categoryAmount = "2400";
    @Input() currency = "R";
}
