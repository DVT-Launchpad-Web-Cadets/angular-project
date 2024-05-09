import { Component } from '@angular/core';
import { BudgetItemComponent } from './budget-item/budget-item.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {
  matKeyboardArrowDown,
  matBarChart,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Observable, from, groupBy, map, mergeMap, of, reduce, tap, toArray } from 'rxjs';
import { EventState, TripState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectCurrencyInfo, selectEvents, selectSelectedTrip } from '../../store/selectors';
import { TagType } from '../../models';
import { AsyncPipe, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-budget',
  standalone: true,
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
  imports: [BudgetItemComponent, NzDropDownModule, NgIconComponent, AsyncPipe, DecimalPipe],
  viewProviders: [provideIcons({ matKeyboardArrowDown, matBarChart })],
})
export class BudgetComponent {
    totalCost = '';
    currency = 'R';
  
    budgetItems$: Observable<{ tag: TagType; totalCost: number; }[]> | undefined;
  
    events$ = this.eventStore.select(selectEvents);
    currencyInfo$ = this.tripStore.select(selectCurrencyInfo);

    totalCost$: Observable<number> | undefined;

    constructor(private eventStore: Store<EventState>, private tripStore: Store<TripState>) {}
  
    ngOnInit(): void {
        this.totalCost$ =  this.events$.pipe(
            map(events => events.reduce((total, event) => total + event.cost, 0))
        );
    }
    // for later use:
    //     this.budgetItems$ = this.events$.pipe(
    //     mergeMap(events => from(events)),
    //       groupBy(event => {
    //         console.log('Event:', event);
    //         return event.tag;
    //       }),
    //       mergeMap(group$ => {
    //         console.log('Group:', group$);
    //         return group$.pipe(
    //           reduce((acc, curr) => {
    //             console.log('Accumulated Cost:', acc);
    //             console.log('Current Event Cost:', curr.cost);
    //             return acc + curr.cost;
    //           }, 0),
    //           map(totalCost => {
    //             console.log('Total Cost:', totalCost);
    //             return { tag: group$.key, totalCost };
    //           }),
    //         )
    //       }),
    //       tap(console.log),
    //       toArray(),
    //       tap(finalArray => console.log('Final Array:', finalArray))
    //     );
    //     this.store.dispatch(getEvents({tripId: 'fER0Rle2lxmx4afH99UB'}));
    // }

    setCurrency(currency: string): void {
        this.currency = currency;
    }

}