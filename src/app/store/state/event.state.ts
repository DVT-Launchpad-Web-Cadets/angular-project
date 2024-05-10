import { EventInterface } from '../../models';

export const eventsFeatureKey = 'events';

export interface EventState {
  events: EventInterface[];
}

export const eventInitialState: EventState = {
  events: [],
};
