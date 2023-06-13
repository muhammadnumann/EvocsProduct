/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Dispatch,
  FC,
  Fragment,
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
  useContext,
} from 'react';
import { forwardRef } from 'react';

import { Menu, Transition } from '@headlessui/react';
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

import { Link as RWLink, navigate, routes } from '@redwoodjs/router';

import InterviewSchedulerAuthPopover from 'src/components/InterviewSchedulerAuthPopover/InterviewSchedulerAuthPopover';
import { InterviewSchedulerContext } from 'src/components/InterviewSchedulerEventsLayoutCell';
import {
  capitalizeFirstLetter,
  ChangeCalFN,
  classNames,
  getDayName,
  getMonthName,
  htmlTimeTag,
  toDashString,
} from 'src/utils/utils';

import { CalendarView } from '../Calendar/Calendar';

type LinkProps = {
  to: string;
  className: string;
};
const Link = forwardRef<HTMLButtonElement, PropsWithChildren<LinkProps>>(
  ({ to, className, children, ...rest }, ref) => {
    return (
      <RWLink className={className} to={to}>
        <button ref={ref} {...rest}>
          {children}
        </button>
      </RWLink>
    );
  }
);

type HeaderTextProps = {
  view: CalendarView;
  selectedDate: Date;
} & HTMLAttributes<HTMLHeadingElement>;

const DayHeaderText: FC<Omit<HeaderTextProps, 'view'>> = ({
  selectedDate,
  ...props
}) => (
  <>
    <h1 {...props}>
      <time dateTime={toDashString(selectedDate)} className="sm:hidden">
        {`${getMonthName(
          selectedDate,
          true
        )} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}
      </time>
      <time dateTime={toDashString(selectedDate)} className="hidden sm:inline">
        {`${getMonthName(
          selectedDate
        )} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}
      </time>
    </h1>
    <p className="xs-plus:text-base mt-1 text-sm text-gray-500">
      {getDayName(selectedDate)}
    </p>
  </>
);

const CalendarHeaderText: FC<HeaderTextProps> = ({ view, selectedDate }) => {
  if (view === CalendarView.DAY) {
    return (
      <DayHeaderText
        className="xs-plus:text-lg text-sm font-semibold leading-6 text-gray-900"
        selectedDate={selectedDate}
      />
    );
  }

  return (
    <>
      <DayHeaderText
        className="xs-plus:text-lg text-sm font-semibold leading-6 text-gray-900 sm:hidden"
        selectedDate={selectedDate}
      />
      <h1 className="xs:text-base xs-plus:text-lg hidden font-semibold text-gray-900 sm:inline">
        <time dateTime={htmlTimeTag(selectedDate)}>
          {`${getMonthName(selectedDate)} ${selectedDate.getFullYear()}`}
        </time>
      </h1>
    </>
  );
};

type Props = {
  productID: number;
  enabled: boolean;
  changeFN: ChangeCalFN;
  selectedDate: Date;
  view: CalendarView;
  upcomingState: [boolean, Dispatch<SetStateAction<boolean>>];
};

const CalendarHeader: FC<Props> = ({
  enabled,
  selectedDate,
  changeFN,
  view,
  upcomingState,
}) => {
  const [showUpcomingList, setShowUpcomingList] = upcomingState;

  const { requiredOauth, configuredOauth } = useContext(
    InterviewSchedulerContext
  );

  const changeDate = (e: MouseEvent<HTMLElement>, d: Date) => {
    navigate(
      changeFN({
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
      }),
      { replace: true }
    );
  };

  const navigateToToday = (e: MouseEvent<HTMLElement>) =>
    changeDate(e, new Date());
  const navigateNext = (e: MouseEvent<HTMLElement>) => {
    const d = new Date(selectedDate);

    switch (view) {
      case CalendarView.DAY:
        d.setDate(d.getDate() + 1);
        return changeDate(e, d);
      case CalendarView.WEEK:
        d.setDate(d.getDate() + 7);
        return changeDate(e, d);
      case CalendarView.MONTH:
        d.setMonth(d.getMonth() + 1);
        if (d.getDate() !== selectedDate.getDate()) {
          d.setDate(0);
        }
        return changeDate(e, d);
    }
  };
  const navigatePrevious = (e: MouseEvent<HTMLElement>) => {
    const d = new Date(selectedDate);

    switch (view) {
      case CalendarView.DAY:
        d.setDate(d.getDate() - 1);
        return changeDate(e, d);
      case CalendarView.WEEK:
        d.setDate(d.getDate() - 7);
        return changeDate(e, d);
      case CalendarView.MONTH:
        d.setMonth(d.getMonth() - 1);
        if (d.getDate() !== selectedDate.getDate()) {
          d.setDate(0);
        }
        return changeDate(e, d);
    }
  };

  return (
    <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 text-xs sm:px-4 lg:flex-none">
      <CalendarHeaderText view={view} selectedDate={selectedDate} />
      <div className="flex items-center">
        <div className="flex items-center rounded-md shadow-sm md:items-stretch">
          <div className="flex">
            {showUpcomingList ? (
              <ArrowsPointingInIcon
                className="xs-plus:h-9 xs-plus:w-9 xs:h-8 xs:w-8 flex h-7 w-7 rounded-md border border-gray-300 bg-white py-2 px-2 text-gray-400 hover:text-gray-500 focus:relative md:mr-4 md:hover:bg-gray-50"
                onClick={() => setShowUpcomingList(!showUpcomingList)}
              />
            ) : (
              <ArrowsPointingOutIcon
                className="xs-plus:h-9 xs-plus:w-9 xs:h-8 xs:w-8 flex h-7 w-7 rounded-md border border-gray-300 bg-white py-2 px-2 text-gray-400 hover:text-gray-500 focus:relative md:mr-4 md:hover:bg-gray-50"
                onClick={() => setShowUpcomingList(!showUpcomingList)}
              />
            )}
            <span className="sr-only">Show upcoming events list</span>
          </div>
          <button
            type="button"
            className="ml-2 flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:ml-0 md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={navigatePrevious}
          >
            <ChevronLeftIcon
              className="xs-plus:h-5 xs-plus:w-5 h-3.5 w-3.5"
              aria-hidden="true"
            >
              <span className="sr-only">Previous month</span>
            </ChevronLeftIcon>
          </button>
          <button
            type="button"
            className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            onClick={navigateToToday}
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={navigateNext}
          >
            <ChevronRightIcon
              className="xs-plus:h-5 xs-plus:w-5 h-3.5 w-3.5"
              aria-hidden="true"
            >
              <span className="sr-only">Next month</span>
            </ChevronRightIcon>
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <span className="sr-only">Open menu</span>
              {`${capitalizeFirstLetter(view)} view`}
              <ChevronDownIcon
                className="ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={changeFN({
                          view: CalendarView.DAY,
                        })}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Day view
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={changeFN({
                          view: CalendarView.WEEK,
                        })}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Week view
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={changeFN({
                          view: CalendarView.MONTH,
                        })}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Month view
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Year view
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="ml-6 h-6 w-px bg-gray-300" />
          {enabled ? (
            <Link
              className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              to={routes.newInterviewSchedulerEvent()}
            >
              Add Event
            </Link>
          ) : (
            <InterviewSchedulerAuthPopover
              className="ml-6"
              label="Provider Authentication"
              requiredAuthStrategies={requiredOauth}
              configuredAuthStrategies={configuredOauth}
            />
          )}
        </div>
        <Menu as="div" className="relative ml-4 md:hidden">
          <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {enabled && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        to={routes.newInterviewSchedulerEvent()}
                      >
                        Add Event
                      </Link>
                    )}
                  </Menu.Item>
                )}
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Menu.Button as={Fragment}>
                      <button
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={navigateToToday}
                      >
                        Go to today
                      </button>
                    </Menu.Button>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={changeFN({
                        view: CalendarView.DAY,
                      })}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Day view
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={changeFN({
                        view: CalendarView.WEEK,
                      })}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Week view
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={changeFN({
                        view: CalendarView.MONTH,
                      })}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Month view
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Year view
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default CalendarHeader;
