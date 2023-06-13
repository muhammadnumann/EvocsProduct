import { useEffect, useState } from 'react';

import type {
  CreateInterviewSchedulerEventInput,
  EditInterviewSchedulerEventById,
  UpdateInterviewSchedulerEventInput,
} from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  RadioField,
  DatetimeLocalField,
  Submit,
  useForm,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

import { RoleList } from 'src/App';
import { useAuth } from 'src/auth';
import {
  BadgeColor,
  badgeColorMax,
} from 'src/components/ColoredBadge/ColoredBadge';
import { EventCalendar } from 'src/components/EventCalendar/EventCalendar';
import InterviewAttendeesForm from 'src/components/InterviewAttendees/InterviewAttendees';
import SearchPeoplePicker from 'src/components/SearchPeoplePicker/SearchPeoplePicker';
import { sanitizeAttendeeForEventSubmit } from 'src/utils/interviewscheduler/person';
import { FormAttendee } from 'src/utils/interviewscheduler/types';

const formatDatetime = (value?: string | Date) => {
  if (value) {
    const d = new Date(value);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }
};

const getDefaultEndTime = (dateString: string): Date => {
  const oneHour = 60 * 60 * 1000;

  const start = new Date(dateString);
  return new Date(start.getTime() + oneHour);
};

export type FormInterviewSchedulerEvent =
  | CreateInterviewSchedulerEventInput
  | UpdateInterviewSchedulerEventInput;

interface InterviewSchedulerEventFormProps {
  interviewSchedulerEvent?: EditInterviewSchedulerEventById['interviewSchedulerEvent'];
  onSave: (data: UpdateInterviewSchedulerEventInput, id?: number) => void;
  error: RWGqlError;
  loading: boolean;
}

const getAttendeeColor = (i: number): BadgeColor => i % badgeColorMax;

const normalizeAttendees = ({
  attendees,
  calendarProvider,
}: InterviewSchedulerEventFormProps['interviewSchedulerEvent']): FormAttendee[] =>
  attendees == null
    ? []
    : attendees.map((a, i) => ({
        color: getAttendeeColor(i),
        calendarProvider,
        ...a,
      }));

const InterviewSchedulerEventForm = (
  props: InterviewSchedulerEventFormProps
) => {
  const { hasRole, currentUser } = useAuth();
  const [attendees, setAttendees] = useState<FormAttendee[]>(
    props.interviewSchedulerEvent
      ? normalizeAttendees(props.interviewSchedulerEvent)
      : []
  );
  const formMethods = useForm<FormInterviewSchedulerEvent>();
  const { getValues, setValue } = formMethods;
  const touched = formMethods.formState.touchedFields;
  console.log(touched);

  const selectedDate =
    formMethods.watch('startTime') ||
    props.interviewSchedulerEvent?.startTime ||
    new Date().toISOString();

  const startTimeSet = touched?.startTime != null;
  const endTimeSet = touched?.endTime != null;
  useEffect(() => {
    if (startTimeSet && !endTimeSet) {
      setValue(
        'endTime',
        formatDatetime(getDefaultEndTime(getValues('startTime')))
      );
    }
  }, [startTimeSet, endTimeSet, setValue, getValues]);

  const addAttendee = (a: FormAttendee) => {
    const attendee: FormAttendee = {
      ...a,
      color: getAttendeeColor(attendees.length),
    };
    setAttendees([...attendees, attendee]);
  };

  const onSubmit = (form: FormInterviewSchedulerEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (form.conferencingProvider === '') {
      form.conferencingProvider = null;
    }
    const { attendees: _attendees, ...rest } = form;
    const data: FormInterviewSchedulerEvent = {
      ...rest,
      attendees: attendees.map(sanitizeAttendeeForEventSubmit),
    };

    props.onSave(data, props?.interviewSchedulerEvent?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormInterviewSchedulerEvent>
        onSubmit={onSubmit}
        error={props.error}
        formMethods={formMethods}
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        {hasRole([RoleList.Admin]) && (
          <>
            <Label
              name="userID"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              User id
            </Label>

            <NumberField
              name="userID"
              defaultValue={
                props.interviewSchedulerEvent?.userID ?? currentUser.userID
              }
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />

            <FieldError name="userID" className="rw-field-error" />
          </>
        )}

        <Label
          name="requisitionID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Requsition ID
        </Label>

        <NumberField
          name="requisitionID"
          defaultValue={props.interviewSchedulerEvent?.requisitionID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="requisitionID" className="rw-field-error" />

        <Label
          name="candidateID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Candidate ID
        </Label>

        <NumberField
          name="candidateID"
          defaultValue={props.interviewSchedulerEvent?.requisitionID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="candidateID" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.interviewSchedulerEvent?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.interviewSchedulerEvent?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />
        <div className="flex flex-row justify-start max-sm:gap-4 md:col-start-2 md:grid md:grid-cols-8 md:space-x-4">
          <div>
            <Label
              name="startTime"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Start time
            </Label>

            <DatetimeLocalField
              name="startTime"
              defaultValue={formatDatetime(
                props.interviewSchedulerEvent?.startTime
              )}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: 'Start time is required' }}
            />

            <FieldError name="startTime" className="rw-field-error" />
          </div>

          <div>
            <Label
              name="endTime"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              End time
            </Label>

            <DatetimeLocalField
              name="endTime"
              defaultValue={formatDatetime(
                props.interviewSchedulerEvent?.endTime
              )}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{
                required: 'End time is required',
                validate: (v) => {
                  return (
                    getValues('startTime') < v ||
                    'Event end time must be after start time'
                  );
                },
              }}
            />

            <FieldError name="endTime" className="rw-field-error" />
          </div>
        </div>

        <div className="md:grid md:grid-cols-[repeat(4,_minmax(0,_1fr))] md:divide-x md:divide-gray-200">
          <div className="flex flex-auto flex-col items-stretch justify-start md:pr-4">
            <Label
              name="attendees"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Attendees
            </Label>
            <InterviewAttendeesForm
              name="attendees"
              attendees={attendees}
              setAttendees={setAttendees}
              validation={{
                validate: {
                  required: () =>
                    attendees.length > 0 || 'At least one attendee is requried',
                },
              }}
              errorClassName="rw-label rw-label-error"
            />
            <SearchPeoplePicker
              className="rw-input"
              addAttendee={addAttendee}
              attendees={attendees}
            />
            <FieldError name="attendees" className="rw-field-error" />
          </div>
          <div className="flex-grow-0 md:col-span-3">
            <EventCalendar
              attendees={attendees}
              date={new Date(selectedDate)}
            />
          </div>
        </div>

        {hasRole(RoleList.Admin) && (
          <>
            <Label
              name="calendarProvider"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Calendar provider
            </Label>

            <div className="rw-check-radio-items">
              <RadioField
                id="interviewSchedulerEvent-calendarProvider-0"
                name="calendarProvider"
                defaultValue="GOOGLE"
                defaultChecked={props.interviewSchedulerEvent?.calendarProvider?.includes(
                  'GOOGLE'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: 'Calendar Provider is required',
                }}
              />
              <div>Google</div>
            </div>

            <div className="rw-check-radio-items">
              <RadioField
                id="interviewSchedulerEvent-calendarProvider-1"
                name="calendarProvider"
                defaultValue="OFFICE365"
                defaultChecked={props.interviewSchedulerEvent?.calendarProvider?.includes(
                  'OFFICE365'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: 'Calendar Provider is required',
                }}
              />
              <div>Office 365</div>
            </div>

            <FieldError name="calendarProvider" className="rw-field-error" />
          </>
        )}
        {hasRole([RoleList.CustomerAdmin]) && (
          <>
            <Label
              name="conferencingProvider"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Conferencing provider
            </Label>

            <div className="rw-check-radio-items">
              <RadioField
                id="interviewSchedulerEvent-conferencingProvider-none"
                name="conferencingProvider"
                defaultValue=""
                defaultChecked={
                  !props.interviewSchedulerEvent?.conferencingProvider
                }
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div className="rw-check-radio-item-none">None</div>
            </div>

            <div className="rw-check-radio-items">
              <RadioField
                id="interviewSchedulerEvent-conferencingProvider-0"
                name="conferencingProvider"
                defaultValue="GOOGLEHANGOUTS"
                defaultChecked={props.interviewSchedulerEvent?.conferencingProvider?.includes(
                  'GOOGLEHANGOUTS'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div>Google Hangouts</div>
            </div>

            <div className="rw-check-radio-items">
              <RadioField
                id="interviewSchedulerEvent-conferencingProvider-1"
                name="conferencingProvider"
                defaultValue="ZOOM"
                defaultChecked={props.interviewSchedulerEvent?.conferencingProvider?.includes(
                  'ZOOM'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div>Zoom</div>
            </div>

            <div className="rw-check-radio-items">
              <RadioField
                id="interviewSchedulerEvent-conferencingProvider-2"
                name="conferencingProvider"
                defaultValue="TEAMS"
                defaultChecked={props.interviewSchedulerEvent?.conferencingProvider?.includes(
                  'TEAMS'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div>Teams</div>
            </div>

            <FieldError
              name="conferencingProvider"
              className="rw-field-error"
            />
          </>
        )}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default InterviewSchedulerEventForm;
