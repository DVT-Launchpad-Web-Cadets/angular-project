import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState, eventsFeatureKey } from '../state/event.state';
import { TagType } from '../../models';
import { selectCurrencyInfo } from './trip.selectors';

export const selectEventFeature =
  createFeatureSelector<EventState>(eventsFeatureKey);

export const selectEvents = createSelector(
  selectEventFeature,
  (state) => state.events
);

export const selectLoading = createSelector(
  selectEventFeature,
  (state) => state.loading
);

export const selectTotalCost = createSelector(
  selectEvents,
  selectCurrencyInfo,
  (events, currencyInfo) => {
    let total = 0;
    for(const event of events){
      total += event.currency === currencyInfo.homeCurrency ? event.cost : event.cost / (currencyInfo.exchangeRate ?? 1);
    }
    return total;
  }
)

export const selectTagTotals = createSelector(
  selectEvents,
  selectCurrencyInfo,
  selectTotalCost,
  (events, currencyInfo, totalCost) => {
    const array : { tag: TagType; totalCost: number, percentage: number }[] = [];
    for(const event of events){
      const matchedIndex = array.findIndex((element) => element.tag === event.tag)
      if (matchedIndex === -1){
        array.push({
          tag: event.tag,
          totalCost: event.currency === currencyInfo.homeCurrency ? event.cost : event.cost / (currencyInfo.exchangeRate ?? 1),
          percentage: 0
        })

        console.log(array);
        console.log(currencyInfo.homeCurrency);
        console.log(event.currency);
      } else {
        array[matchedIndex].totalCost += event.currency === currencyInfo.homeCurrency ? event.cost : event.cost / (currencyInfo.exchangeRate ?? 1);
      }
    }
    for(const tagTotal of array){
      tagTotal.percentage = Math.round(tagTotal.totalCost * 100 / totalCost);
    }
    return array;
  }
)