import { EventInterface } from '../../models';

export const eventsFeatureKey = 'events';

export interface EventState {
  events: EventInterface[];
  loading: boolean;
}

export const eventInitialState: EventState = {
  events: [],
  loading: false,
};
