import {
  CalendarProvider,
  FindInterviewSchedulerEvents,
  InterviewSchedulerEventAttendee,
} from 'types/graphql';

import { BadgeColor } from 'src/components/ColoredBadge/ColoredBadge';

import { ArrayElement, PartialBy } from '../types';

export type FormAttendee = PartialBy<
  Omit<InterviewSchedulerEventAttendee, 'interviewSchedulerEvent'>,
  'id' | 'eventID'
> & { color?: BadgeColor; calendarProvider: CalendarProvider };

export type Event = ArrayElement<
  FindInterviewSchedulerEvents['interviewSchedulerEvents']
>;

export type DateEvents = {
  date: Date;
  events: Event[];
};

export type DateEventsLike<E extends { startTime: string }> = {
  date: Date;
  events: E[];
};

export type PeopleEvents = Event & {
  attendeeURI: FormAttendee['attendeeURI'];
  email: string;
  avatarURL?: string;
};

export type PeopleDateEvents = DateEventsLike<PeopleEvents>;
