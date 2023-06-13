import humanize from 'humanize-string';
import type { FindInterviewSchedulerEventById } from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { RoleList } from 'src/App';
import { useAuth } from 'src/auth';
import InterviewSchedulerProviderLogoIcon from 'src/components/Icons/InterviewSchedulerProviderLogoIcon/InterviewSchedulerProviderLogoIcon';
import { InterviewAttendees } from 'src/components/InterviewAttendees/InterviewAttendees';

const DELETE_INTERVIEW_SCHEDULER_EVENT_MUTATION = gql`
  mutation DeleteInterviewSchedulerEventMutation($id: Int!) {
    deleteInterviewSchedulerEvent(id: $id) {
      id
    }
  }
`;

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value));
      return humanizedValues.join(', ');
    } else {
      return humanize(values as string);
    }
  }
};

const timeTag = (datetime?: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toLocaleString()}
      </time>
    )
  );
};

interface Props {
  interviewSchedulerEvent: NonNullable<
    FindInterviewSchedulerEventById['interviewSchedulerEvent']
  >;
}

const InterviewSchedulerEvent = ({ interviewSchedulerEvent }: Props) => {
  const { hasRole } = useAuth();

  const [deleteInterviewSchedulerEvent] = useMutation(
    DELETE_INTERVIEW_SCHEDULER_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('InterviewSchedulerEvent deleted');
        navigate(routes.interviewSchedulerEvents());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onDeleteClick = ({
    id,
    title,
  }: NonNullable<
    FindInterviewSchedulerEventById['interviewSchedulerEvent']
  >) => {
    if (confirm(`Are you sure you want to delete ${title}?`)) {
      deleteInterviewSchedulerEvent({ variables: { id } });
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-gray-100 shadow sm:rounded-lg">
        <header className="flex items-center gap-4 px-4 py-4 sm:px-6">
          <InterviewSchedulerProviderLogoIcon
            width={24}
            height={24}
            provider={interviewSchedulerEvent.calendarProvider}
          />
          <h2 className="text-lg font-semibold leading-6 text-gray-900">
            <p className="max-w-2xl text-sm leading-none text-gray-500">
              {interviewSchedulerEvent.title}
            </p>
          </h2>
        </header>
        <div className="border-t border-gray-200">
          <dl>
            {hasRole([RoleList.EvocsInternal, RoleList.Admin]) && (
              <>
                <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <dt className="justify-self-end text-sm font-medium text-gray-500">
                    ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {interviewSchedulerEvent.id}
                  </dd>
                </div>
                <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <dt className="justify-self-end text-sm font-medium text-gray-500">
                    User ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {interviewSchedulerEvent.userID}
                  </dd>
                </div>
                <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <dt className="justify-self-end text-sm font-medium text-gray-500 ">
                    Workday Requisition ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {interviewSchedulerEvent.requisitionID}
                  </dd>
                </div>
                <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <dt className="justify-self-end text-sm font-medium text-gray-500">
                    Customer ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {interviewSchedulerEvent.customerID}
                  </dd>
                </div>
                <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <dt className="justify-self-end text-sm font-medium text-gray-500">
                    Conferencing Provider
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {formatEnum(interviewSchedulerEvent.conferencingProvider)}
                  </dd>
                </div>
              </>
            )}
            <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="justify-self-end text-sm font-medium text-gray-500">
                Title
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {interviewSchedulerEvent.title}
              </dd>
            </div>
            <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="justify-self-end text-sm font-medium text-gray-500">
                Description
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {interviewSchedulerEvent.description}
              </dd>
            </div>
            <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="justify-self-end text-sm font-medium text-gray-500">
                Attendees
              </dt>
              <dd className="-ml-3 mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <InterviewAttendees
                  attendees={interviewSchedulerEvent.attendees.map((a) => ({
                    ...a,
                    calendarProvider: interviewSchedulerEvent.calendarProvider,
                  }))}
                />
              </dd>
            </div>
            <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="justify-self-end text-sm font-medium text-gray-500">
                Start Time
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {timeTag(interviewSchedulerEvent.startTime)}
              </dd>
            </div>
            <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="justify-self-end text-sm font-medium text-gray-500">
                End Time
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {timeTag(interviewSchedulerEvent.endTime)}
              </dd>
            </div>
            <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="justify-self-end text-sm font-medium text-gray-500">
                Created at
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {timeTag(interviewSchedulerEvent.createdAt)}
              </dd>
            </div>
            <div className="px-4 py-4 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="justify-self-end text-sm font-medium text-gray-500">
                Updated at
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {timeTag(interviewSchedulerEvent.updatedAt)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editInterviewSchedulerEvent({
            id: interviewSchedulerEvent.id,
          })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(interviewSchedulerEvent)}
        >
          Cancel?
        </button>
      </nav>
    </>
  );
};

export default InterviewSchedulerEvent;
