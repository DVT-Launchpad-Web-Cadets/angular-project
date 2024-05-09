import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyInterface, CurrencyResponseInterface } from '../models';
import { Observable, retry, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrencyRates(
    homeCurrency: string,
    desitnationCurrency: string
  ): Observable<CurrencyResponseInterface> {
    return this.http.get<CurrencyResponseInterface>(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_XGV2Q23qAAUzSliqE72pXOB8NAjOeNZOvgizVazL&base_currency=${homeCurrency}&currencies=${desitnationCurrency}`
    );
  }
}
