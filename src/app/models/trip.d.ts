export interface TripInterface {
    id: number;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    days: DayInterface[];
}