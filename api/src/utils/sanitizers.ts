import {
  CalendarProvider,
  CreateInterviewSchedulerEventInput,
  UpdateInterviewSchedulerEventInput,
  UpsertInterviewSchedulerEventAttendeeInput,
} from 'types/graphql';

type EventAttendees =
  | CreateInterviewSchedulerEventInput['attendees']
  | UpdateInterviewSchedulerEventInput['attendees'];

export const sanitizeEventAttendees = (
  calendarProvider: CalendarProvider,
  attendees: EventAttendees
): UpsertInterviewSchedulerEventAttendeeInput[] => {
  switch (calendarProvider) {
    case 'OFFICE365':
      return sanitizeMSGraphAttendees(attendees);
    default:
      return attendees;
  }
};

const sanitizeMSGraphAttendees = (
  attendees: EventAttendees
): UpsertInterviewSchedulerEventAttendeeInput[] =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attendees.map(({ avatarURL, ...attendee }) => attendee);
