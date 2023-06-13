import { FC, HTMLAttributes, useState } from 'react';

import { GetGroupCalendarAvailabilityRequest } from '@buf/bufbuild_connect-web_evocs_commonschema/products/v1/interviewscheduler_pb';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { normalizeAPIAvailabilitySearch } from 'src/utils/interviewscheduler/event';
import {
  FormAttendee,
  PeopleDateEvents,
} from 'src/utils/interviewscheduler/types';
import {
  dateToProtoTimestamp,
  emailToCalendarID,
} from 'src/utils/productRunnerClient';
import {
  getDatesByView,
  getDayName,
  getMonthName,
  htmlTimeTag,
  paddedDateNumber,
} from 'src/utils/utils';

import './styles/root.css';
import './styles/dayview.css';
import './styles/aside/form.css';
import { CalendarView } from '../Calendars/Calendar/Calendar';
import EventDayCalendar from '../Calendars/EventDayCalendar/EventDayCalendar';
import { AttendeeImage } from '../Person/PersonImage/PersonImage';
import { useProductRunnerClient } from '../ProductRunnerContext/ProductRunnerContext';

import context from './context/appContext';
import Form from './Form';
import getClosest, {
  calcNewHourFromCoords,
  calcNewMinuteFromCoords,
  calcTime,
  createTemporaryBox,
  formatTime,
  getBoxDefaultStyle,
  getOriginalBoxObject,
  getTempDates,
  resetOriginalBox,
  resetStyleOnClick,
  setBoxTimeAttributes,
  startEndDefault,
} from './utilities/datePicker';

const EventCalendarHeaderAttendee: FC<
  { attendee: FormAttendee } & HTMLAttributes<HTMLDivElement>
> = ({ attendee, className }) => {
  const { name } = attendee;
  return (
    <div className={className}>
      <p>{name}</p>
      <AttendeeImage attendee={attendee} />
    </div>
  );
};

type EventCalendarProps = {
  attendees: FormAttendee[];
  date: Date;
};

export const EventCalendar: FC<EventCalendarProps> = ({ attendees, date }) => {
  const client = useProductRunnerClient();
  const [dateEvents, setDateEvents] = useState<PeopleDateEvents[]>([]);
  const weekDates = getDatesByView(CalendarView.WEEK, date);
  const monthDates = getDatesByView(CalendarView.MONTH, date);

  const availabilityFrom = weekDates[0];
  const availabilityTo = weekDates[weekDates.length - 1];

  const calendarIds = attendees.map(emailToCalendarID);
  const showAttendeesInHeader = attendees.length > 1;
  const [newEvent, setNewEvent] = useState(false);
  const [testObj, setTestObj] = useState(null);
  const [eventTime, seteventTime] = useState('');
  const [eventStarTime, seteventStarTime] = useState('');
  const [eventEndTime, seteventEndTime] = useState('');

  const [events, setEvents] = useState([
    // {
    //   category: 'default',
    //   completed: false,
    //   description: '',
    //   end: '2023-02-17T00:15:00.000Z',
    //   id: 'le880ie2pb758nukov',
    //   start: '2023-02-17T01:00:00.000Z',
    //   title: 'sadsad',
    //   coordinates: { allDay: false, x: 5, y: 34.8, h: 0, e: 58 },
    // },
  ]);
  const [formValues, setFromValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [height, setHeight] = useState(0);
  const [y, setY] = useState(0);
  function editModel(e) {
    const newFormValues = {
      category: 'default',
      completed: false,
      id: e.id,
      description: e.description,
      end: e.end,
      start: e.start,
      title: e.title,
      eventTime: e.end,
      coordinates: e.coordinates,
    };
    setFromValues(newFormValues);
    setShowModal(true);
  }
  function delegateDayView(e) {
    if (showModal) {
      setShowModal(false);
      setNewEvent(false);
      setTestObj(null);
    } else {
      const dvhresizehandle = getClosest(e, '.dv-box-resize-s');
      const dvhbox = getClosest(e, '.dv-box');
      const dvhgrid = getClosest(e, '.my-dayview-main-grid');
      const dvhboxTop = getClosest(e, '.dayview--ontop__grid-item');

      // resize existing event
      if (dvhresizehandle) {
        resizeBoxNSDay(e, e.target.parentElement);
        return;
      }

      // drag existing event
      if (dvhbox) {
        dragEngineDay(e, e.target);
        return;
      }

      // drag empty space to create new event
      if (dvhgrid) {
        // @ts-ignore
        createBoxOnDragDay(e, e.target);
        return;
      }

      // opens stacked all day events (less than 6)
      if (dvhboxTop) {
        return;
      }
    }
  }

  /** DRAG NORTH/ SOUTH, EAST/ WEST */
  function dragEngineDay(e, box) {
    const dvGrid = document.querySelector('.my-dayview-grid');

    const col = box.parentElement;
    let boxhasOnTop = false;

    const startTop = +box.style.top.split('px')[0];
    const boxHeight = +box.style.height.split('px')[0];
    // @ts-ignore
    const startCursorY = e.pageY - parseInt(dvGrid.offsetTop);
    const headerOffset = +dvGrid.getBoundingClientRect().top.toFixed(2);
    const [tempX, tempY] = [e.pageX, e.pageY];
    let [sX, sY] = [0, 0];
    let hasStyles = false;

    /** DRAG NORTH SOUTH */
    const mousemove = (e) => {
      sX = Math.abs(e.clientX - tempX);
      sY = Math.abs(e.clientY - tempY);
      if (!hasStyles) {
        if (sX > 3 || sY > 3) {
          hasStyles = true;
          document.body.style.cursor = 'move';
          if (box.classList.contains('dv-box-ontop')) {
            boxhasOnTop = true;
            resetStyleOnClick('day', box);
          }
          box.classList.add('dv-box-dragging');
          createTemporaryBox(box, col, boxhasOnTop, 'day');
          sX = 0;
          sY = 0;
        }
      }

      const currentCursorY = e.pageY - headerOffset;
      const newOffsetY = currentCursorY - startCursorY;

      const scrolled = parseInt(
        document.getElementsByTagName('html')[0].scrollTop
      );
      let newTop = Math.round((newOffsetY + startTop - scrolled) / 11.6) * 11.6;

      if (newTop < 0 || currentCursorY < 0) {
        newTop = 0;
        return;
      } else if (newTop + boxHeight > 1650) {
        return;
      }

      box.style.top = `${newTop}px`;
    };

    const mouseup = () => {
      // if box did not move, no render needed
      // click event to open form

      box.classList.remove('dv-box-dragging');
      if (boxhasOnTop) {
        box.classList.add('dv-box-ontop');
      }

      setBoxTimeAttributes(box, 'day');
      const start = +box.getAttribute('data-dv-start-time');
      const length = +box.getAttribute('data-dv-time-intervals');
      const time = calcTime(start, length, start * 11.6);

      box.setAttribute('data-dv-time', time);

      box.children[1].children[0].textContent = time;

      // @ts-ignore
      const id = box.getAttribute('data-dv-box-id');
      const boxEntry = events.filter((ev) => ev.id === id)[0];
      const coords = boxEntry.coordinates;
      const boxstart = +coords.y * 10;
      const boxend = +coords.e * 10;
      const startDate = new Date(boxEntry.start);
      const starthours = Math.floor(boxstart / 60);
      const startminutes = boxstart % 60;
      startDate.setHours(starthours);
      startDate.setMinutes(startminutes);

      const endDate = new Date(boxEntry.start);
      let endhours = Math.floor(boxend / 60);
      let endminutes = boxend % 60;
      if (endhours === 24) {
        endhours = 23;
        endminutes = 59;
      }
      endDate.setHours(endhours);
      endDate.setMinutes(endminutes);
      const tempbox = document?.querySelector('.dv-temporary-box');
      if (tempbox) {
        tempbox.remove();
      }
      const allNewEvents = events.map((ev) => {
        if (ev.id === id) {
          // @ts-ignore
          // @ts-ignore
          ev = {
            ...ev,
            coordinates: coords,
            // @ts-ignore
            end: endDate,
            // @ts-ignore
            start: startDate,
          };
        }
        return ev;
      });
      document.body.style.cursor = 'pointer';
      setEvents(allNewEvents);
      box.setAttribute('data-dv-box-index', 'box-one');

      // if (boxes.getBoxes().length > 1) {
      //   handleOverlap(null, 'day');
      // } else {
      //   box.setAttribute('data-dv-box-index', 'box-one');
      // }

      // configHeader();

      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  }

  /** CREATE BOX ON DRAG */
  function createBoxOnDragDay(e) {
    const dvGrid = document.querySelector('.my-dayview-grid');

    document.body.style.cursor = 'move';
    // const [tempcategory, color] = store.getFirstActiveCategoryKeyPair();
    const color = 'blue';

    const box = document.createElement('div');
    box.setAttribute('class', 'dv-box dv-box-dragging dayview-temp-box');

    // boxheader is static - create from template
    // @ts-ignore
    const headerOffset = parseInt(dvGrid.offsetTop);
    // @ts-ignore
    const scrolled = parseInt(dvGrid.scrollTop);
    const startCursorY = e.pageY - headerOffset;

    const y = Math.round((startCursorY + Math.abs(scrolled)) / 11.6) * 11.6;
    setY(y);

    box.setAttribute('style', getBoxDefaultStyle(y, color));

    const coords = { y: +y / 11.6, x: 1, h: 1, e: 2 };
    let [starthour, startmin, endhour, endmin] = startEndDefault(y);

    const testObj = {
      coords,
      starthour,
      startmin,
      endhour,
      endmin,
      top: y,
    };
    let movedY = 0;
    setTestObj({
      ...testObj,
      coordinates: coords,
    });

    // append content to temporary box

    setNewEvent(true);
    // append content to temporary box

    function mousemove(e) {
      movedY += e.movementY;
      let newHeight =
        Math.round((e.pageY + scrolled - y - headerOffset) / 11.6) * 11.6;
      if (newHeight <= 11.6) {
        newHeight = 11.6;
      }
      if (newHeight + y > 1650) {
        newHeight = 1649.5 - y;
      }

      setHeight(newHeight);

      box.style.height = `${newHeight}px`;
      coords.h = +newHeight / 11.6;
      coords.e = +coords.y + coords.h;
      setTestObj({
        ...testObj,
        coordinates: coords,
        height: newHeight,
      });

      endhour = calcNewHourFromCoords(newHeight, y);
      endmin = calcNewMinuteFromCoords(newHeight, y);

      setTestObj({
        ...testObj,
        coordinates: coords,
        y: +coords.y * 11.6,
      });
    }
    function mouseup() {
      if (movedY <= 20) {
        if (+coords.y >= 92) {
          coords.y = 92;
          coords.e = 95;
          coords.h = 3;
          box.style.height = '37.5px';
          box.style.top = '1150px';
          [starthour, startmin] = [23, 0];
          [endhour, endmin] = [23, 45];
        } else {
          coords.y = starthour * 4;
          coords.e = +coords.y + 4;
          coords.h = 4;
          box.style.height = '50px';

          box.style.top = `${+coords.y * 11.6}px`;
          [starthour, startmin] = [starthour, 0];
          [endhour, endmin] = [starthour + 1, 0];
        }
      }

      const datesData = getTempDates(
        new Date(context.getDate()),
        [starthour, endhour],
        [startmin, endmin]
      );

      const start = testObj.top / 11.6;
      const length = testObj.coords.h;

      const time = calcTime(start, length, testObj.top);
      seteventTime(time);
      const newFormValues = {
        category: 'default',
        completed: false,
        description: '',
        end: datesData[1],
        start: datesData[0],
        title: null,
        eventTime: time,
        coordinates: {
          allDay: false,
          ...coords,
          y: +coords.y * 11.6,
        },
      };

      const eStartHours = Math.floor(+start / 6);
      const eStartMinutes = (+start * 10) % 60;
      const eEndHours = Math.floor((start + length) / 6);
      const eEndMinutes = ((start + length) * 10) % 60;
      let eStartingtime = formatTime(eStartHours, eStartMinutes);
      const eEndingtime = formatTime(eEndHours, eEndMinutes);
      if (eStartingtime.slice(-2) == eEndingtime.slice(-2)) {
        eStartingtime = eStartingtime.slice(0, -2);
      }
      seteventStarTime(eStartingtime);
      seteventEndTime(eEndingtime);

      setFromValues(newFormValues);
      setShowModal(true);

      // setStylingForEvent('dragend', dvGrid, store);
      document.removeEventListener('mouseup', mouseup);
      document.removeEventListener('mousemove', mousemove);
    }
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  }

  function resizeBoxNSDay(e, box) {
    const dvGrid = document.querySelector('.my-dayview-grid');

    const boxorig = getOriginalBoxObject(box);

    const boxTop = box.offsetTop;
    // @ts-ignore
    const headerOffset = parseInt(dvGrid.offsetTop);

    // @ts-ignore
    const amountScrolled = parseInt(dvGrid.scrollTop);

    const mousemove = (e) => {
      const newHeight =
        Math.round((e.pageY + amountScrolled - boxTop - headerOffset) / 11.6) *
        11.6;

      if (newHeight <= 11.6) {
        box.style.height = '11.6px';
        return;
      } else if (newHeight + boxTop > 1650) {
        return;
      } else {
        box.style.height = `${newHeight}px`;
      }
    };

    function mouseup() {
      if (boxorig.height === box.offsetHeight) {
        resetOriginalBox(box, boxorig);
      } else {
        //setBoxTimeAttributes(box, 'day');
        const start = +box.getAttribute('data-dv-start-time');
        const length = +box.getAttribute('data-dv-time-intervals');

        const time = calcTime(start, length, start * 11.6);
        box.setAttribute('data-dv-time', time);
        box.firstChild.nextSibling.firstElementChild.textContent = time;

        setBoxTimeAttributes(box, 'day');
        const start2 = +box.getAttribute('data-dv-start-time');
        const length2 = +box.getAttribute('data-dv-time-intervals');
        const time2 = calcTime(start2, length2, start2 * 11.6);
        box.setAttribute('data-dv-time', time2);
        box.children[1].children[0].textContent = time2;

        const id = box.getAttribute('data-dv-box-id');

        const boxEntry = events.filter((ev) => ev.id === id)[0];

        const coords = boxEntry.coordinates;
        const boxstart = +coords.y * 10;
        const boxend = +coords.e * 10;

        const startDate = new Date(boxEntry.start);
        const starthours = Math.floor(boxstart / 60);
        const startminutes = boxstart % 60;
        startDate.setHours(starthours);
        startDate.setMinutes(startminutes);

        const endDate = new Date(boxEntry.start);
        let endhours = Math.floor(boxend / 60);
        let endminutes = boxend % 60;
        if (endhours === 24) {
          endhours = 23;
          endminutes = 59;
        }
        endDate.setHours(endhours);
        endDate.setMinutes(endminutes);
        const tempbox = document?.querySelector('.dv-temporary-box');
        if (tempbox) {
          tempbox.remove();
        }
        const allNewEvents = events.map((ev) => {
          if (ev.id === id) {
            ev = {
              ...ev,
              coordinates: {
                ...coords,
                allDay: false,
              },
              // @ts-ignore
              end: endDate,
              // @ts-ignore
              start: startDate,
            };
          }
          return ev;
        });

        setEvents(allNewEvents);

        // updateBoxCoordinates(box, 'day', events);
        // boxes.updateStore(store, box.getAttribute('data-dv-box-id'));
        // check if new position overlaps with other boxes and handle
        // if (events.length > 1) {
        //   handleOverlap(null, 'day', events);
        // } else {
        //   box.setAttribute('data-dv-box-index', 'box-one');
        // }
      }

      // configHeader();
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    }
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  }

  const setTitle = (e) => {
    setFromValues({ ...formValues, title: e.target.value });
  };
  const setDec = (e) => {
    setFromValues({
      ...formValues,
      description: e.target.value,
    });
  };
  const formBtn = (e) => {
    const ev = events;
    if (formValues.id) {
      const updated = ev.map((event) => {
        if (event.id === formValues.id) {
          event.title = formValues.title;
          event.description = formValues.description;
        }
        return event;
      });
      setEvents(updated);
    } else {
      // @ts-ignore
      formValues.id = Math.random().toString().substr(2, 18);
      // @ts-ignore
      formValues.coordinates.y = height;
      // @ts-ignore
      formValues.coordinates.h = y;
      // @ts-ignore
      ev.push(formValues);
      setFromValues({});
      setEvents(ev);
    }

    setShowModal(false);
    setNewEvent(false);
    setTestObj(null);
  };
  const cancelBtn = () => {};

  useDeepCompareEffect(() => {
    const fetchAPIEvents = async () => {
      const req = new GetGroupCalendarAvailabilityRequest({
        calendarIds,
        startingAt: dateToProtoTimestamp(availabilityFrom),
        endingAt: dateToProtoTimestamp(availabilityTo),
      });
      const resp = await client.getGroupCalendarAvailability(req);
      setDateEvents(normalizeAPIAvailabilitySearch(weekDates, attendees, resp));
    };

    if (calendarIds.length) {
      fetchAPIEvents();
    }
  }, [calendarIds, availabilityFrom, availabilityTo]);

  return (
    <div className="flex flex-col">
      {showModal && (
        <aside
          className="entries__form"
          style={{
            position: 'fixed',
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            margin: 'auto',
          }}
        >
          <aside className="form-modal-overlay hide-form-overlay"></aside>
          <div className="entries__form--header">
            <div className="form-header--dragarea"></div>
            <div
              className="form--header__icon-close"
              data-tooltip="close form"
              onClick={(e) => {
                setTestObj(null);
                setShowModal(false);
                setNewEvent(false);
                setTestObj(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                fill="var(--white2)"
              >
                <path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"></path>
              </svg>
            </div>
          </div>
          <Form
            eventStarTime={eventStarTime}
            eventEndTime={eventEndTime}
            setTitle={setTitle}
            setDec={setDec}
            formValues={formValues}
            formBtn={formBtn}
          />
        </aside>
      )}
      <div
        className="calendar__dayview custom-picker flex flex-col overflow-y-scroll"
        onMouseDown={(e) => delegateDayView(e)}
      >
        <header
          className="relative z-20 grid border-b border-gray-200 py-4 pl-14"
          style={{
            gridTemplateColumns: `repeat(${
              showAttendeesInHeader ? attendees.length : 1
            }, minmax(0, 1fr))`,
          }}
        >
          <div className="flex flex-none justify-between">
            <div>
              <h2 className="text-lg font-semibold leading-6 text-gray-900">
                <time dateTime={htmlTimeTag(date)}>
                  {` ${getMonthName(date)} ${paddedDateNumber(
                    date
                  )}, ${date.getFullYear()}`}
                </time>
              </h2>
              <p className="mt-1 text-sm text-gray-500">{getDayName(date)}</p>
            </div>
            {showAttendeesInHeader && (
              <EventCalendarHeaderAttendee
                className="mr-4 flex flex-col items-end"
                attendee={attendees[0]}
              />
            )}
          </div>
          {showAttendeesInHeader &&
            attendees
              .slice(1)
              .map((attendee) => (
                <EventCalendarHeaderAttendee
                  key={attendee.attendeeURI}
                  className="mr-4 flex flex-col items-end"
                  attendee={attendee}
                />
              ))}
        </header>
        <EventDayCalendar
          attendees={attendees}
          weekDates={weekDates}
          monthDates={monthDates}
          selectedDate={date}
          dateEvents={dateEvents}
          hideMonthCalendar={true}
          allevents={events}
          testObj={testObj}
          newEvent={newEvent}
          eventTime={eventTime}
          editModel={(e) => editModel(e)}
        />
      </div>
    </div>
  );
};
