import {
  Dispatch,
  FC,
  Fragment,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import { TrashIcon } from '@heroicons/react/24/outline';
import { FindCandidateSuppliedScheduleQuery } from 'types/graphql';

import { CalendarView } from 'src/components/Calendars/Calendar/Calendar';
import {
  bgClass,
  columnStart,
  idStringHash,
  rowSpanLength,
  rowStart,
  timeClass,
} from 'src/components/Calendars/dayWeekEvent';
import {
  classNames,
  getDatesByView,
  getDayName,
  htmlTimeTag,
  isSameDate,
  isToday,
  mergeDatesAndEvents,
  toDashString,
  today,
  toFormattedTimeString,
} from 'src/utils/utils';

import { ScheduleSelectionLike } from '../PublicCandidateSchedule';

type EventListItemProps = Pick<Props, 'startTime' | 'linkID' | 'inEditMode'> & {
  onDelete: () => void;
} & HTMLAttributes<HTMLLIElement>;

const EventListItem: FC<EventListItemProps> = ({
  linkID,
  startTime,
  inEditMode,
  onDelete,
  ...props
}) => {
  const start = new Date(startTime);
  const colorFactor = idStringHash(linkID) % 5;
  return (
    <li {...props}>
      <div
        className={classNames(
          'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5',
          bgClass(colorFactor, inEditMode),
          !inEditMode && 'cursor-default'
        )}
      >
        {/* <p
          className={classNames(
            'order-1 font-semibold',
            titleClass(colorFactor)
          )}
        >
          {event.title}
        </p> */}
        <div className="flex justify-between">
          <p className={timeClass(colorFactor, inEditMode)}>
            <time dateTime={htmlTimeTag(start)}>
              {toFormattedTimeString(start)}
            </time>
          </p>
          {inEditMode && (
            <button onClick={() => onDelete()}>
              <TrashIcon
                className={classNames(
                  'hidden h-4 w-4 group-hover:block',
                  timeClass(colorFactor)
                )}
              />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

type Props = Omit<
  FindCandidateSuppliedScheduleQuery['candidateSuppliedSchedule'],
  'scheduleSelections'
> & {
  linkID: string;
  inEditMode: boolean;
  addSelection: Dispatch<ScheduleSelectionLike>;
  removeSelection: Dispatch<ScheduleSelectionLike>;
  scheduleSelections: ScheduleSelectionLike[];
};

// type Props = {
//   selectedDate: Date;
//   dates: Date[];
//   events: FindInterviewSchedulerEvents['interviewSchedulerEvents'];
//   dateEvents: DateEvents[];
// };
const PublicCandidateScheduleWeekCalendar: FC<Props> = ({
  linkID,
  startTime,
  scheduleSelections,
  inEditMode,
  removeSelection,
}) => {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const [selectedDate, setSelectedDate] = useState(new Date(startTime));
  const dates = getDatesByView(CalendarView.WEEK, selectedDate);
  const selections = mergeDatesAndEvents(dates, scheduleSelections);

  useEffect(() => {
    // Set the container scroll position based on the current time
    // such that the middle is roughly the current time
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      (1440 + 90);
  }, []);

  return (
    <div
      ref={container}
      className="flex max-h-full flex-auto  flex-col overflow-auto bg-white"
    >
      <div
        style={{ width: '165%' }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-10 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
        >
          <div className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden">
            {selections.map(({ date: day }) => {
              const todayAndSelected = isSameDate(today(), selectedDate, day);
              const todayNotSelected = isToday(day) && !todayAndSelected;
              const selected =
                isSameDate(selectedDate, day) && !todayAndSelected;
              return (
                <button
                  key={toDashString(day)}
                  type="button"
                  className="flex flex-col items-center pt-3 pb-1.5"
                  onClick={() => setSelectedDate(day)}
                >
                  {getDayName(day).slice(0, 1)}{' '}
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

          <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 md:grid">
            <div className="col-end-1 w-14" />
            {selections.map(({ date: day }) => (
              <div
                key={toDashString(day)}
                className="flex items-center justify-center border-b py-3"
              >
                <span
                  className={classNames(isToday(day) && 'flex items-baseline')}
                >
                  {`${getDayName(day).slice(0, 3)} `}
                  <span
                    className={classNames(
                      isToday(day)
                        ? 'ml-1.5 flex h-8 w-8 rounded-full bg-indigo-600 text-white'
                        : 'text-gray-900',
                      'items-center justify-center font-semibold text-gray-900'
                    )}
                  >
                    {day.getDate()}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-auto">
          <div className="sticky left-0 w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 sm:pr-8"
              style={{ gridTemplateRows: 'repeat(48, minmax(2.5rem, 1fr))' }}
            >
              <div ref={containerOffset} className="row-end-1 h-7"></div>
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

            {/* Vertical lines */}
            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
              <div className="col-start-1 row-span-full" />
              <div className="col-start-2 row-span-full" />
              <div className="col-start-3 row-span-full" />
              <div className="col-start-4 row-span-full" />
              <div className="col-start-5 row-span-full" />
              <div className="col-start-6 row-span-full" />
              <div className="col-start-7 row-span-full" />
              <div className="col-start-8 row-span-full w-8" />
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
              style={{
                gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
              }}
            >
              {scheduleSelections.map((event) => {
                const start = new Date(event.startTime);
                const end = new Date(event.endTime);
                const eventOnSelectedDay = isSameDate(selectedDate, start);

                return (
                  <Fragment key={event.id}>
                    {eventOnSelectedDay && (
                      <EventListItem
                        className="relative col-start-1 mt-px flex hover:z-10 sm:hidden"
                        style={{
                          gridRow: `${rowStart(start)} / span ${rowSpanLength(
                            start,
                            end
                          )}`,
                        }}
                        startTime={event.startTime}
                        linkID={linkID}
                        inEditMode={inEditMode}
                        onDelete={() => removeSelection(event)}
                      />
                    )}
                    <EventListItem
                      className="relative mt-px hidden hover:z-10 sm:flex"
                      style={{
                        gridRow: `${rowStart(start)} / span ${rowSpanLength(
                          start,
                          end
                        )}`,
                        gridColumnStart: `${columnStart(start)}`,
                      }}
                      startTime={event.startTime}
                      linkID={linkID}
                      inEditMode={inEditMode}
                      onDelete={() => removeSelection(event)}
                    />
                  </Fragment>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCandidateScheduleWeekCalendar;
