import { Component } from '@angular/core';
import { BudgetItemComponent } from './budget-item/budget-item.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {
  matKeyboardArrowDown,
  matBarChart,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  Observable,
  from,
  groupBy,
  map,
  mergeMap,
  reduce,
  tap,
  toArray,
} from 'rxjs';
import { EventState, TripState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectCurrencyInfo, selectEvents } from '../../store/selectors';
import { TagType } from '../../models';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-budget',
  standalone: true,
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
  imports: [
    BudgetItemComponent,
    NzDropDownModule,
    NgIconComponent,
    AsyncPipe,
    DecimalPipe,
  ],
  viewProviders: [provideIcons({ matKeyboardArrowDown, matBarChart })],
})
export class BudgetComponent {
  totalCost = '';
  currency = '';

  homeCurrency = '';
  conversionRate = 1;

  budgetItems$: Observable<{ tag: TagType; totalCost: number }[]> | undefined;

  events$ = this.eventStore.select(selectEvents);
  currencyInfo$ = this.tripStore.select(selectCurrencyInfo);

  totalCost$: Observable<number> | undefined;

  constructor(
    private eventStore: Store<EventState>,
    private tripStore: Store<TripState>
  ) {}

  ngOnInit(): void {
    this.currencyInfo$.subscribe((currencyInfo) => {
    this.currency = currencyInfo.homeCurrency ?? this.currency;
    this.homeCurrency = currencyInfo.homeCurrency ?? this.currency;
    this.conversionRate = currencyInfo.exchangeRate ?? this.conversionRate;
    });

    this.totalCost$ = this.events$.pipe(
        map(events => events.reduce((total, event) => {
            if (event.currency === this.homeCurrency) {
                return total + event.cost;
            } else 
                return total + (event.cost / this.conversionRate);
        }, 0))
    );

    // for later use
    // this.budgetItems$ = this.events$.pipe(
    //   mergeMap((events) => from(events)),
    //   groupBy((event) => {
    //     console.log('Event:', event);
    //     return event.tag;
    //   }),
    //   mergeMap((group$) => {
    //     console.log('Group:', group$);
    //     return group$.pipe(
    //       reduce((acc, curr) => {
    //         console.log('Accumulated Cost:', acc);
    //         console.log('Current Event Cost:', curr.cost);
    //         return acc + curr.cost;
    //       }, 0),
    //       map((totalCost) => {
    //         console.log('Total Cost:', totalCost);
    //         return { tag: group$.key, totalCost };
    //       })
    //     );
    //   }),
    //   tap(console.log),
    //   toArray(),
    //   tap((finalArray) => console.log('Final Array:', finalArray))
    // );
  }

  setCurrency(currency: string): void {
    this.currency = currency;
  }
}
