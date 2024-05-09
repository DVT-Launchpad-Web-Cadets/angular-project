export interface TripInterface {
  id?: string;
  userId?: string;
  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  homeCurrency: string;
  destinationCurrency: string;
  exchangeRate?: number;
}
