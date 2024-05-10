export interface TripInterface {
  id?: string;
  userId?: string;
  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  homeCurrency: string;
  homeCurrencySymbol?: string;
  destinationCurrency: string;
  destinationCurrencySymbol?: string;
  exchangeRate?: number;
  imageUrl?: string;
}
