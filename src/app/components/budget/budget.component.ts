import { Component } from '@angular/core';
import { BudgetItemComponent } from './budget-item/budget-item.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {
  matKeyboardArrowDown,
  matBarChart,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  Subscription,
} from 'rxjs';
import { EventState, TripState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectCurrencyInfo, selectTagTotals, selectTotalCost } from '../../store/selectors';
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

  currencyInfo$ = this.tripStore.select(selectCurrencyInfo);
  totalCost$ = this.eventStore.select(selectTotalCost);
  tagTotals$ = this.eventStore.select(selectTagTotals);

  subscription: Subscription | undefined;

  constructor(
    private eventStore: Store<EventState>,
    private tripStore: Store<TripState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.currencyInfo$.subscribe((currencyInfo) => {
      this.currency = currencyInfo.homeCurrency ?? this.currency;
      this.homeCurrency = currencyInfo.homeCurrency ?? this.currency;
      this.currencySymbol = currencyInfo.homeCurrencySymbol ?? this.currencySymbol;
    });
  }

  setCurrency(currency: string, symbol: string, exchangeRate: number): void {
    this.currency = currency;
    this.currencySymbol = symbol;
    this.conversionRate = exchangeRate;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
