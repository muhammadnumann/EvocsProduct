import { Schedule as Office365Schedule } from '@buf/bufbuild_connect-web_evocs_commonschema/external/msgraph/calendar/v1/calendar_pb';
import { GetGroupCalendarAvailabilityResponse } from '@buf/bufbuild_connect-web_evocs_commonschema/products/v1/interviewscheduler_pb';
import { v4 as uuidv4 } from 'uuid';

import { mergeDatesAndEvents } from '../utils';

import { FormAttendee, PeopleEvents, PeopleDateEvents } from './types';

export const normalizeAPIAvailabilitySearch = (
  dates: Date[],
  attendees: FormAttendee[],
  resp: GetGroupCalendarAvailabilityResponse
): PeopleDateEvents[] => {
  switch (resp.calendarEvents.case) {
    case 'googleEvents':
      return [];
    case 'office365Events':
      return normalizeAPIOffice365Events(
        dates,
        attendees,
        resp.calendarEvents.value.calendarEvents.schedules
      );
  }
};

const normalizeAPIOffice365Events = (
  dates: Date[],
  attendees: FormAttendee[],
  schedules: Office365Schedule[]
): PeopleDateEvents[] => {
  const peopleEvents: PeopleEvents[] = [];

  for (const schedule of schedules) {
    const { id, email, attendeeURI, avatarURL } = attendees.find(
      ({ email }) => email === schedule.scheduleId
    );
    const personEvents: PeopleEvents[] =
      schedule.scheduleItems.map<PeopleEvents>(({ subject, start, end }) => ({
        id: uuidv4(),
        userID: id,
        title: subject && subject !== '' ? subject : 'busy',
        description: '',
        startTime: start.dateTime.toDate().toISOString(),
        endTime: end.dateTime.toDate().toISOString(),
        requisitionID: 0,
        avatarURL,
        attendeeURI,
        candidateID: 0,
        email,
      }));
    peopleEvents.push(...personEvents);
  }

  return mergeDatesAndEvents(dates, peopleEvents);
};
