/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useRef } from 'react';
import { MouseEvent } from 'react';
import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { Link, navigate, routes } from '@redwoodjs/router';

import {
  FormAttendee,
  PeopleDateEvents,
  PeopleEvents,
} from 'src/utils/interviewscheduler/types';
import {
  classNames,
  datesForMonth,
  getDayName,
  getMonthName,
  htmlTimeTag,
  isCurrentMonth,
  isSameDate,
  isToday,
  paddedDayDateString,
  toDashString,
  today,
  toFormattedTimeString,
} from 'src/utils/utils';

import { CalendarView } from '../Calendar/Calendar';
import {
  bgClass,
  rowSpanLength,
  rowStart,
  timeClass,
  titleClass,
} from '../dayWeekEvent';

const getTodayEvents = (
  selectedDate: Date,
  dateEvents: PeopleDateEvents[]
): PeopleDateEvents => {
  if (!dateEvents?.length) {
    return { date: selectedDate, events: [] };
  }
  return dateEvents.filter(({ date }) => isSameDate(date, selectedDate))[0];
};

const ShowEvents = (props) => {
  const { ev, eventTime } = props;
  return (
    <div
      onClick={(e) => {
        if (e.currentTarget == e.target) {
          e.preventDefault();
          e.stopPropagation();
          props.editModel(ev);
        }
      }}
      className="dv-box"
      data-dv-start-time={ev.coordinates.x}
      data-dv-time-intervals={ev.coordinates.h}
      data-dv-end-time={ev.coordinates.e}
      data-dv-box-index={ev.coordinates.h}
      data-dv-box-id={ev.id}
      data-dv-box-category="default"
      style={{
        backgroundColor: 'rgb(44, 82, 186)',
        top: `${ev.coordinates.h}px`,
        height: `${ev.coordinates.y}px`,
        left: 'calc((100% - 0px) * 0 + 0px)',
        width: 'calc((100% - 4px) * 1)',
      }}
    >
      <div className="dv-box__header">
        <div className="dv-box-title">{ev.title}</div>
      </div>
      <div className="dv-box__content">
        <span className="dv-box-time">{ev.eventTime}</span>
      </div>
      <div className="dv-box-resize-s"></div>
    </div>
  );
};
// when an attendee is removed there is a lag in retrieval of new
// events from the api which causes a search of which column to place events
// in fails as the attendee is no longer in the attendees array and,
// therefore, has no corresponding index
const filterEventsByAttendees = (
  attendees: FormAttendee[],
  { date, events }: PeopleDateEvents
) => {
  const attendeeURIs: Set<string> = attendees.reduce(
    (acc, { attendeeURI }) => acc.add(attendeeURI),
    new Set<string>()
  );

  return {
    date,
    events: events.filter(({ attendeeURI }) => attendeeURIs.has(attendeeURI)),
  };
};

type Props = {
  attendees: FormAttendee[];
  weekDates: Date[];
  monthDates: Date[];
  dateEvents: PeopleDateEvents[];
  selectedDate: Date;
  hideMonthCalendar?: boolean;
  allevents?: any;
  newEvent?: boolean;
  testObj?: any;
  eventTime?: any;
  editModel?: any;
};
const EventDayCalendar: FC<Props> = ({
  attendees,
  weekDates,
  monthDates: initialMonthDates,
  dateEvents,
  selectedDate,
  hideMonthCalendar,
  allevents,
  newEvent,
  testObj,
  eventTime,
  editModel,
}) => {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const [monthDates, setMonthDates] = useState(initialMonthDates);
  const [selectedMonthDate, setSelectedMonthDate] = useState(selectedDate);

  const todayEvents = getTodayEvents(selectedDate, dateEvents);
  const filteredEvents = filterEventsByAttendees(attendees, todayEvents);
  const events: PeopleEvents[] = filteredEvents.events;
  const attendeeIndexes: Record<string, number> = attendees.reduce(
    (acc, { attendeeURI }, i) => ({ ...acc, [attendeeURI]: i }),
    {}
  );
  const showMultipleColumns = attendees.length > 1;

  useEffect(() => {
    const dates = datesForMonth(
      selectedMonthDate.getMonth(),
      selectedMonthDate.getFullYear()
    );
    setMonthDates(dates);
  }, [selectedMonthDate]);

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  const isSelected = (d: Date) => isSameDate(selectedDate, d);

  const navigatePreviousMonth = (_e: MouseEvent<HTMLElement>) => {
    const d = new Date(selectedMonthDate);
    d.setMonth(d.getMonth() - 1);
    if (d.getDate() !== selectedMonthDate.getDate()) {
      d.setDate(0);
    }
    setSelectedMonthDate(d);
  };
  const navigateNextMonth = (_e: MouseEvent<HTMLElement>) => {
    const d = new Date(selectedMonthDate);
    d.setMonth(d.getMonth() + 1);
    if (d.getDate() !== selectedMonthDate.getDate()) {
      d.setDate(0);
    }
    setSelectedMonthDate(d);
  };
  const changeDateFromMonth = (d: Date) => {
    navigate(
      routes.interviewSchedulerEvents({
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        view: CalendarView.DAY,
      }),
      { replace: true }
    );
  };

  const gridColumnStart = (attendeeURI: string) =>
    showMultipleColumns ? attendeeIndexes[attendeeURI] + 1 : 1;

  const gridColumnEnd = (attendeeURI: string) =>
    showMultipleColumns ? attendeeIndexes[attendeeURI] + 1 : 1;

  // dayview--main - grid
  // grid flex - auto grid - rows - 1
  return (
    <div className="flex flex-auto overflow-hidden bg-white">
      <div
        ref={container}
        className="flex flex-auto flex-col overflow-auto pt-5 pb-5"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
        >
          {weekDates.map((day) => {
            const todayAndSelected = isSameDate(today(), selectedDate, day);
            const todayNotSelected = isToday(day) && !todayAndSelected;
            const selected = isSameDate(selectedDate, day) && !todayAndSelected;
            return (
              <button
                key={toDashString(day)}
                type="button"
                className="flex flex-col items-center pt-3 pb-1.5"
                onClick={() => changeDateFromMonth(day)}
              >
                <span>{getDayName(day).slice(0, 1)}</span>
                <span
                  className={classNames(
                    'mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900',
                    todayNotSelected && 'text-indigo-600',
                    selected && 'bg-gray-900 text-white',
                    todayAndSelected && 'bg-indigo-600 text-white'
                  )}
                >
                  {day.getDate()}
                </span>
              </button>
            );
          })}
        </div>
        <div className="my-dayview-grid flex w-full flex-auto ">
          <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div
            className="grid  flex-auto grid-rows-1"
            style={{
              gridTemplateColumns: `repeat(${
                attendees.length ?? 1
              }, minmax(0, 1fr))`,
            }}
          >
            {/* Horizontal lines */}
            <div
              className="my-dayview-main-grid relative col-start-1  row-start-1 grid divide-y divide-gray-100"
              style={{
                gridTemplateRows: 'repeat(48, minmax(2.5rem, 1fr))',
                gridColumnEnd: `${attendees.length ? 1 + attendees.length : 3}`,
              }}
            >
              {allevents?.map((ev, idx) => (
                <ShowEvents
                  key={idx}
                  ev={ev}
                  eventTime={eventTime}
                  editModel={editModel}
                />
              ))}
              {newEvent && testObj && (
                <div
                  className="dv-box dayview-temp-box"
                  data-dv-start-time={testObj.coordinates.y}
                  data-dv-time-intervals={testObj.coordinates.h}
                  data-dv-end-time={testObj.coordinates.e}
                  data-dv-box-index={testObj.coordinates.h}
                  data-dv-box-category="default"
                  style={{
                    backgroundColor: 'rgb(44, 82, 186)',
                    top: `${testObj.top}px`,
                    height: `${testObj.height}px`,
                    left: 'calc((100% - 0px) * 0 + 0px)',
                    width: 'calc((100% - 4px) * 1)',
                  }}
                >
                  <div className="dv-box__header">
                    <div className="dv-box-title">{testObj.title}</div>
                  </div>
                  <div className="dv-box__content">
                    <span className="dv-box-time">{eventTime}</span>
                  </div>
                  <div className="dv-box-resize-s"></div>
                </div>
              )}
              <div ref={containerOffset} className="row-end-1"></div>
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  12AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  1AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  2AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  3AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  4AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  5AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  6AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  7AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  8AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  9AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  10AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  11AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  12PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  1PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  2PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  3PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  4PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  5PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  6PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  7PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  8PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  9PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  10PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                  11PM
                </div>
              </div>
              <div />
            </div>

            {/* Events */}
            <ol
              className="col-start-1 row-start-1 grid"
              style={{
                gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
                gridColumnEnd: showMultipleColumns ? attendees.length + 1 : 1,
                // gridTemplateColumns: '1 rem repeat(2, minmax(9, 1fr)) auto',
              }}
            >
              {showMultipleColumns &&
                attendees.map(({ attendeeURI }, i, { length }) => (
                  <span
                    key={attendeeURI}
                    className={classNames(
                      'row-span-full',
                      i < length - 1 && 'border-r-2'
                    )}
                    style={{
                      gridColumnStart: gridColumnStart(attendeeURI),
                      gridColumnEnd: gridColumnEnd(attendeeURI),
                    }}
                  ></span>
                ))}
              {events.map((event) => {
                const start = new Date(event.startTime);
                const end = new Date(event.endTime);
                const colorFactor = attendeeIndexes[event.attendeeURI] % 5;

                return (
                  <li
                    key={event.id}
                    className="relative mt-px flex hover:z-10"
                    style={{
                      gridRow: `${rowStart(start)} / span ${rowSpanLength(
                        start,
                        end
                      )}`,
                      gridColumnStart: gridColumnStart(event.attendeeURI),
                      gridColumnEnd: gridColumnEnd(event.attendeeURI),
                    }}
                  >
                    <Link
                      to={routes.interviewSchedulerEvent({ id: event.id })}
                      className={classNames(
                        'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5',
                        bgClass(colorFactor)
                      )}
                    >
                      <p
                        className={classNames(
                          'order-1 font-semibold',
                          titleClass(colorFactor)
                        )}
                      >
                        {event.title}
                      </p>
                      <p className={timeClass(colorFactor)}>
                        <time dateTime={htmlTimeTag(start)}>
                          {toFormattedTimeString(start)}
                        </time>
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
      {!hideMonthCalendar && (
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
          <div className="flex items-center text-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={navigatePreviousMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto font-semibold">{`${getMonthName(
              selectedMonthDate
            )} ${selectedMonthDate.getFullYear()}`}</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={navigateNextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>

          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {monthDates.map((day, dayIdx) => (
              <button
                key={toDashString(day)}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  isCurrentMonth(day) ? 'bg-white' : 'bg-gray-50',
                  (isSelected(day) || isToday(day)) && 'font-semibold',
                  isSelected(day) && 'text-white',
                  !isSelected(day) &&
                    isCurrentMonth(day) &&
                    !isToday(day) &&
                    'text-gray-900',
                  !isSelected(day) &&
                    !isCurrentMonth(day) &&
                    !isToday(day) &&
                    'text-gray-400',
                  isToday(day) && !isSelected(day) && 'text-indigo-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === monthDates.length - 7 && 'rounded-bl-lg',
                  dayIdx === monthDates.length - 1 && 'rounded-br-lg'
                )}
                onClick={() => changeDateFromMonth(day)}
              >
                <time
                  dateTime={htmlTimeTag(day)}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    isSelected(day) && isToday(day) && 'bg-indigo-600',
                    isSelected(day) && !isToday(day) && 'bg-gray-900'
                  )}
                >
                  {paddedDayDateString(day)}
                </time>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDayCalendar;
