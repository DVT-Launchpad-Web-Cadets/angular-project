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
  Subscription,
  from,
  groupBy,
  map,
  mergeMap,
  reduce,
  scan,
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
  totalCost = 0;
  currency = '';

  homeCurrency = '';
  currencySymbol = '';
  conversionRate = 1;

  budgetItems$: Observable<{ tag: TagType; totalCost: number }> | undefined;

  array : { tag: TagType; totalCost: number }[] = [];

  events$ = this.eventStore.select(selectEvents);
  currencyInfo$ = this.tripStore.select(selectCurrencyInfo);

  subscription: Subscription | undefined;

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
      this.currencySymbol = currencyInfo.homeCurrencySymbol ?? this.currencySymbol;
    });

    this.totalCost$ = this.events$.pipe(
      map((events) =>
        events.reduce((total, event) => {
          if (event.currency === this.homeCurrency) {
            return total + event.cost;
          } else return total + event.cost / this.conversionRate;
        }, 0)
      )
    );

    // for later use

    this.budgetItems$ = this.events$.pipe(
      mergeMap((events) => from(events)),
      groupBy((event) => event.tag),
      mergeMap((group$) => group$.pipe(
        map((event) => event.currency === this.homeCurrency ? event.cost : event.cost / this.conversionRate),
        scan((sum, cost) => sum + cost, 0),
        map((totalCost) => ({ tag: group$.key, totalCost }))
      )),
      tap((item) => {
        this.replaceBudgetItem(item);
        console.log('Item:', item);
        console.log('Array:', this.array);
      }),
    );
    // why does this only return a single item? Not a whole array?
    // this.budgetItems$ = this.events$.pipe(
    //   mergeMap((events) => from(events)),
    //   groupBy((event) => {
    //     return event.tag;
    //   }),
    //   mergeMap((group$) => {
    //     console.log('Group:', group$);
    //     return group$.pipe(
    //       map((event) => {
    //         if (event.currency === this.homeCurrency) {
    //           return event.cost;
    //         } else {
    //             return event.cost / this.conversionRate
    //         };
    //       }),
    //       scan((sum, eventCost) => {
    //         return sum + eventCost;
    //       }, 0),
    //       map((totalCost) => {
    //         return { tag: group$.key, totalCost };
    //       })
    //     );
    //   }),
    //   tap((item) => {
    //     this.array.push(item);
    //     console.log('Item:', item);
    //     console.log('Array:', this.array);
    //   }),
    //   map((item) => [item]), // Wrap the object in an array
    //   tap((itemsArray) => console.log('Final Result:', itemsArray))
    // );
  }

  setCurrency(currency: string, symbol: string): void {
    this.currency = currency;
    this.currencySymbol = symbol;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  replaceBudgetItem(item: { tag: TagType; totalCost: number }) {
    const existingIndex = this.array.findIndex(
      (arrItem) => arrItem.tag === item.tag
    );
  
    if (existingIndex === -1) {
      // If the tag doesn't exist in the array, push the new item
      this.array.push(item);
    } else {
      // If the tag exists, replace the existing item with the new one
      this.array[existingIndex] = item;
    }
  }
}
