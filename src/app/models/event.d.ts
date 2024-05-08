import { CostInterface } from './cost';
import { LocationInterface } from './location';

export interface EventInterface {
  id?: string;
  tripId: string;
  date: string;
  name: string;
  startTime: Date;
  endTime: Date;
  latitude?: string;
  longitude?: string;
  locationUrl?: string;
  tag:
  | 'Food'
  | 'Transport'
  | 'Lodging'
  | 'Activity'
  | 'Historical'
  | 'Shopping'
  | 'Flight'
  | 'Coffee'
  | 'Entertainment'
  | 'Other';
  notes?: string;
  cost: number;
  currency?: string;
}

export type Tag = 
  | 'Food'
  | 'Transport'
  | 'Lodging'
  | 'Activity'
  | 'Historical'
  | 'Shopping'
  | 'Flight'
  | 'Coffee'
  | 'Entertainment'
  | 'Other';