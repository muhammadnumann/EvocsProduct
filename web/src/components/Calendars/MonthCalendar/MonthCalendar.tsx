/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';

import { ClockIcon } from '@heroicons/react/24/outline';

import { Link, navigate, routes } from '@redwoodjs/router';

import { DateEvents } from 'src/utils/interviewscheduler/types';
import {
  ChangeCalFN,
  classNames,
  htmlTimeTag,
  isCurrentMonth,
  isSameDate,
  isToday,
  toDashString,
  toFormattedTimeString,
} from 'src/utils/utils';

type Props = {
  selectedDate: Date;
  dateEvents: DateEvents[];
  changeFN: ChangeCalFN;
};
const MonthCalendar: FC<Props> = ({ selectedDate, dateEvents, changeFN }) => {
  const isSelected = (d: Date) => isSameDate(selectedDate, d);

  const selectedDateEvents = dateEvents.find(({ date }) =>
    isSameDate(selectedDate, date)
  );
  const selectedDayEvents = selectedDateEvents?.events ?? [];

  return (
    <>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col lg:overflow-auto">
        <div className="sticky top-0 z-10 grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {dateEvents.map(({ date: day, events }) => {
              return (
                <div
                  key={toDashString(day)}
                  className={classNames(
                    isCurrentMonth(day, selectedDate)
                      ? 'bg-white'
                      : 'bg-gray-50 text-gray-500',
                    'relative py-2 px-3'
                  )}
                >
                  <time
                    dateTime={toDashString(day)}
                    className={
                      isToday(day)
                        ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                        : undefined
                    }
                  >
                    {toDashString(day).split('-').pop().replace(/^0/, '')}
                  </time>
                  {events.length > 0 && (
                    <ol className="mt-2">
                      {events.slice(0, 2).map((event) => (
                        <li key={event.id} className="block">
                          <Link
                            to={routes.interviewSchedulerEvent({
                              id: event.id,
                            })}
                            className="group flex"
                          >
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              {event.title}
                            </p>
                            <time
                              dateTime={htmlTimeTag(new Date(event.startTime))}
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              {toFormattedTimeString(new Date(event.startTime))}
                            </time>
                          </Link>
                        </li>
                      ))}
                      {events.length > 2 && (
                        <li className="text-gray-500">
                          + {events.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              );
            })}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {dateEvents.map(({ date: day, events }) => {
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={classNames(
                    isCurrentMonth(day, selectedDate)
                      ? 'bg-white'
                      : 'bg-gray-50',
                    (isSelected(day) || isToday(day)) && 'font-semibold',
                    isSelected(day) && 'text-white',
                    !isSelected(day) && isToday(day) && 'text-indigo-600',
                    !isSelected(day) &&
                      isCurrentMonth(day, selectedDate) &&
                      !isToday(day) &&
                      'text-gray-900',
                    !isSelected(day) &&
                      !isCurrentMonth(day, selectedDate) &&
                      !isToday(day) &&
                      'text-gray-500',
                    'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'
                  )}
                  onClick={() => {
                    navigate(
                      changeFN({
                        day: day.getDate(),
                        month: day.getMonth() + 1,
                      }),
                      { replace: true }
                    );
                  }}
                >
                  <time
                    dateTime={day.toISOString()}
                    className={classNames(
                      isSelected(day) &&
                        'flex h-6 w-6 items-center justify-center rounded-full',
                      isSelected(day) && isToday(day) && 'bg-indigo-600',
                      isSelected(day) && !isToday(day) && 'bg-gray-900',
                      'ml-auto'
                    )}
                  >
                    {toDashString(day).split('-').pop().replace(/^0/, '')}
                  </time>
                  <p className="sr-only">{events.length} events</p>
                  {events.length > 0 && (
                    <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {selectedDayEvents.length > 0 && (
        <div className="py-10 px-4 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDayEvents.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.title}</p>
                  <time
                    dateTime={htmlTimeTag(new Date(event.startTime))}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <ClockIcon
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {toFormattedTimeString(new Date(event.startTime))}
                  </time>
                </div>
                <a
                  href={routes.interviewSchedulerEvent({ id: event.id })}
                  className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default MonthCalendar;
