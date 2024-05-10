import { Component } from '@angular/core';
import { BudgetItemComponent } from "./budget-item/budget-item.component";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { matKeyboardArrowDown, matBarChart } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'app-budget',
    standalone: true,
    templateUrl: './budget.component.html',
    styleUrl: './budget.component.css',
    imports: [BudgetItemComponent, NzDropDownModule, NgIconComponent],
    viewProviders: [provideIcons({ matKeyboardArrowDown, matBarChart })],

})
export class BudgetComponent {
    totalCost = '';
    currency = 'R';
}
