export interface EventInterface {
  id?: string;
  tripId: string;
  date: string;
  name: string;
  startTime: Date;
  endTime: Date;
  latitude?: number;
  longitude?: number;
  locationUrl?: string;
  tag: TagType;
  notes?: string;
  cost: number;
  currency?: string;
}

export type TagType = 
  | 'Food'
  | 'Transport'
  | 'Lodging'
  | 'Activity'
  | 'Historical'
  | 'Shopping'
  | 'Flight'
  | 'Coffee'
  | 'Entertainment'
  | 'Other'
  | string;