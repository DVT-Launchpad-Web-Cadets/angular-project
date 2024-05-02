import { LocationInterface } from "./location";

export interface DayInterface {
    id: number;
    tripId: number;
    date: string;
    location: LocationInterface;
    events: EventInterface[];
}