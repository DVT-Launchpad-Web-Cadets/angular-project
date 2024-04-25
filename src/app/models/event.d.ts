import { CostInterface } from "./cost";
import { LocationInterface } from "./location";

export interface EventInterface {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    location: LocationInterface;
    tag: "Food" | "Transport" | "Lodging" | "Activity" | "Histroical" | "Shppoing" | "Flight" | "Coffee" | "`Entertainment" | "Other";
    notes: string;
    cost: CostInterface;
}