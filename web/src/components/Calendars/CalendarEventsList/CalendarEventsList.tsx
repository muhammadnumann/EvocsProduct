import { FC } from 'react';

import { Link, routes } from '@redwoodjs/router';

import { Event } from 'src/utils/interviewscheduler/types';
import {
  dateString,
  htmlTimeTag,
  today,
  toFormattedTimeString,
} from 'src/utils/utils';

const EventTimeRange: FC<{ start: string; end: string }> = ({ start, end }) => {
  const startD = new Date(start);
  const endD = new Date(end);

  return (
    <>
      <time dateTime={htmlTimeTag(startD)}>
        {toFormattedTimeString(startD)}
      </time>{' '}
      - <time dateTime={htmlTimeTag(endD)}>{toFormattedTimeString(endD)}</time>
    </>
  );
};

type Props = {
  events: Omit<Event, 'userID' | 'requisitionID'>[];
};
const CalendarEventsList: FC<Props> = ({ events }) => {
  const upcoming = events.reduce((acc: Event[], e) => {
    return today() <= new Date(e.startTime) ? [...acc, e] : acc;
  }, []);

  const upcomingByDate: Record<string, Event[]> = upcoming.reduce((acc, e) => {
    const key = dateString(new Date(e.startTime));
    if (acc[key] == null) {
      acc[key] = [];
    }
    acc[key].push(e);
    return acc;
  }, {});

  return (
    <div className="flex flex-col border-b border-gray-200 p-4">
      <h2 className="font-semibold text-gray-900">Upcoming events</h2>
      <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
        {upcoming.length === 0 && (
          <p className="mt-2 flex-auto sm:mt-0">No upcoming scheduled events</p>
        )}
        {Object.keys(upcomingByDate).map((key) => {
          const d = new Date(key);
          const dayEvents = upcomingByDate[key];
          return dayEvents.map((event) => {
            return (
              <li key={event.id} className="flex flex-col py-4 md:flex-row">
                <time dateTime={htmlTimeTag(d)} className="w-28 flex-none">
                  {key}
                </time>
                <div className="flex-none md:hidden">
                  <EventTimeRange start={event.startTime} end={event.endTime} />
                </div>
                <Link
                  className="mt-2 flex-grow-0 justify-between truncate sm:mt-0"
                  to={routes.interviewSchedulerEvent({ id: event.id })}
                >
                  <section className="flex flex-col">
                    <p className="truncate font-bold">{event.title}</p>
                    <p className="truncate text-xs font-semibold">
                      {event.description}
                    </p>
                  </section>
                </Link>
                <p className="ml-6 hidden flex-none md:ml-auto md:flex">
                  <EventTimeRange start={event.startTime} end={event.endTime} />
                </p>
              </li>
            );
          });
        })}
      </ol>
    </div>
  );
};

export default CalendarEventsList;
