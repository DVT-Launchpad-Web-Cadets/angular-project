import { LocationInterface } from "./location";

export interface DayInterface {
    id?: string;
    tripId: string;
    date: string;
    location?: LocationInterface;
}