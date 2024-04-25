import { LocationInterface } from "./location";

export interface DayInterface {
    id: number;
    date: string;
    location: LocationInterface;
    events: EventInterface[];
}