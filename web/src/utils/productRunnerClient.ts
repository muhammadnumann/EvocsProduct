import { CalendarID } from '@buf/bufbuild_connect-web_evocs_commonschema/products/v1/interviewscheduler_pb';
import { Timestamp } from '@bufbuild/protobuf';

import { FormAttendee } from './interviewscheduler/types';

export const emailToCalendarID = ({ email }: FormAttendee): CalendarID =>
  new CalendarID({ calendarId: { case: 'calendarName', value: email } });

export const dateToProtoTimestamp = (d: Date): Timestamp =>
  new Timestamp().fromJson(d.toISOString());
