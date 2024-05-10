import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyResponseInterface } from '../models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  
  private apiKey: string;

  constructor(private http: HttpClient) {
    this.apiKey = environment.apiKey;
  }

  getCurrencyRates(
    homeCurrency: string,
    desitnationCurrency: string
  ): Observable<CurrencyResponseInterface> {
    return this.http.get<CurrencyResponseInterface>(
      `https://api.currencyapi.com/v3/latest?apikey=${this.apiKey}&base_currency=${homeCurrency}&currencies=${desitnationCurrency}`
    );
  }
}
