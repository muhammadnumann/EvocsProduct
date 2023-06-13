import {
  Dispatch,
  FC,
  Fragment,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { HTMLAttributes } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {
  Controller,
  TextAreaFieldProps,
  useErrorStyles,
  useFormContext,
} from '@redwoodjs/forms';

import { FormAttendee } from 'src/utils/interviewscheduler/types';
import { classNames } from 'src/utils/utils';

import { AttendeeImage } from '../Person/PersonImage/PersonImage';
import { useProductRunnerClient } from '../ProductRunnerContext/ProductRunnerContext';

import { retrieveMSGraphProfileImages } from './retrieveMSGraphProfileImages';

interface Props extends HTMLAttributes<HTMLTableSectionElement> {
  attendees: FormAttendee[];
}

export const InterviewAttendees: FC<Props> = ({ attendees, className }) => {
  return (
    <section className={classNames('mt-12 md:mt-0', className)}>
      <ol className="mt-4 w-full space-y-1 text-sm leading-6 text-gray-500">
        {attendees.map((person, _i) => (
          <li
            key={`${person.attendeeURI}$`}
            className="group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 hover:bg-gray-100"
          >
            <AttendeeImage attendee={person} />
            <div className="flex-auto">
              <p className="text-gray-900">{person.name}</p>
              <span className="truncate text-gray-500">{person.email}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

interface FormProps extends TextAreaFieldProps {
  attendees: FormAttendee[];
  setAttendees: Dispatch<SetStateAction<FormAttendee[]>>;
}

const InterviewAttendeesForm: FC<FormProps> = ({
  attendees,
  setAttendees,
  name,
  errorClassName,
  validation,
  className,
}) => {
  const client = useProductRunnerClient();
  const removeFn = (i: number) =>
    setAttendees(attendees.filter((_, index) => i !== index));

  const [doNotFetchPhotoList, setDoNotFetchPhotoList] = useState(
    new Set<string>()
  );

  const { className: componentClassName, style: componentStyle } =
    useErrorStyles({
      className,
      errorClassName,
      name,
    });

  const {
    trigger,
    formState: { isSubmitted, isSubmitSuccessful },
  } = useFormContext();

  useEffect(() => {
    if (isSubmitted && !isSubmitSuccessful) {
      trigger('attendees');
    }
  }, [isSubmitSuccessful, isSubmitted, trigger, attendees]);

  useDeepCompareEffect(() => {
    const fetchMSGraphProfileImages = async () => {
      const { attendeeImages, failedIDs } = await retrieveMSGraphProfileImages(
        client,
        attendees,
        doNotFetchPhotoList
      );
      if (!attendeeImages && !failedIDs) {
        return;
      }
      setDoNotFetchPhotoList((dnf) => new Set([...dnf, ...failedIDs]));

      const updatedAttendees = attendees.map((attendee) => {
        if (attendee.attendeeURI in attendeeImages) {
          return {
            ...attendee,
            avatarURL: attendeeImages[attendee.attendeeURI],
          };
        }

        return attendee;
      });
      setAttendees(updatedAttendees);
    };

    fetchMSGraphProfileImages();
  }, [client, attendees, setAttendees]);

  return (
    <Controller
      name={name}
      rules={validation}
      render={() => (
        <section
          className={classNames('mt-12 md:mt-0', componentClassName)}
          style={componentStyle}
        >
          <ol className="mt-4 w-full space-y-1 text-sm leading-6 text-gray-500">
            {!attendees ||
              (attendees.length === 0 && <span>Search for attendees...</span>)}
            {attendees.map((person, i) => (
              <li
                key={`${person.attendeeURI}$`}
                className="lg-plus:px-4 group mr-0 grid grid-cols-6 items-center gap-4 rounded-xl py-2 focus-within:bg-gray-100 hover:bg-gray-100 md:pl-4 md:pr-2"
              >
                <div className="col-span-1">
                  <AttendeeImage attendee={person} />
                </div>
                <div className="col-span-4 col-start-2 flex-auto">
                  <p className="text-gray-900">{person.name}</p>
                  <span className="inline-block w-full truncate text-gray-500">
                    {person.email}
                  </span>
                </div>
                <Menu
                  as="div"
                  className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
                >
                  <div>
                    <Menu.Button
                      className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600"
                      onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        removeFn(i);
                      }}
                    >
                      <span className="sr-only">Remove attendee</span>
                      <XMarkIcon className="h-6 w-6 text-gray-400 hover:rounded-md hover:bg-slate-300 hover:text-red-600 active:bg-slate-400 active:text-red-700" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
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
                              Edit
                            </a>
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
                              Cancel
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            ))}
          </ol>
        </section>
      )}
    />
  );
};

export default InterviewAttendeesForm;
