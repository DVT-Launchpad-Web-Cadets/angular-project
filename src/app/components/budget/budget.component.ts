import { Component } from '@angular/core';
import { BudgetItemComponent } from "./budget-item/budget-item.component";

@Component({
    selector: 'app-budget',
    standalone: true,
    templateUrl: './budget.component.html',
    styleUrl: './budget.component.css',
    imports: [BudgetItemComponent]
})
export class BudgetComponent {
    totalCost = '33 430';
    currency = 'R';
}
