import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ItenaryComponent } from '../itenary/itenary.component';
import { BudgetComponent } from "../budget/budget.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { MapComponent } from "../map/map.component";
@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    imports: [NzTabsModule, NzButtonModule, ItenaryComponent, BudgetComponent, CalendarComponent, MapComponent]
})
export class MenuComponent {

}
