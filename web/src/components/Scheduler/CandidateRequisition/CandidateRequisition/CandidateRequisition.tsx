import { FC, useState } from 'react';

import { Transition } from '@headlessui/react';
import {
  CheckIcon,
  HandThumbUpIcon,
  PaperClipIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import {
  AddNoteToCandidateRequisition,
  AddNoteToCandidateRequisitionVariables,
  FindCandidateRequisitionDetailQuery,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import NotesList from 'src/components/NotesList/NotesList';
import { classNames } from 'src/utils/utils';

const ADD_NOTE = gql`
  mutation AddNoteToCandidateRequisition($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      content
      createdAt
      upatedAt

      User {
        id
        name
        email
        avatarURL
      }
    }
  }
`;

// const user = {
//   name: 'Whitney Francis',
//   email: 'whitney@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
// };
// const navigation = [
//   { name: 'Dashboard', href: '#' },
//   { name: 'Jobs', href: '#' },
//   { name: 'Applicants', href: '#' },
//   { name: 'Company', href: '#' },
// ];
// const breadcrumbs = [
//   { name: 'Jobs', href: '#', current: false },
//   { name: 'Front End Developer', href: '#', current: false },
//   { name: 'Applicants', href: '#', current: true },
// ];
// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ];
// const attachments = [
//   { name: 'resume_front_end_developer.pdf', href: '#' },
//   { name: 'coverletter_front_end_developer.pdf', href: '#' },
// ];

// const comments = [
//   {
//     id: 1,
//     name: 'Leslie Alexander',
//     date: '4d ago',
//     imageId: '1494790108377-be9c29b29330',
//     body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
//   },
//   {
//     id: 2,
//     name: 'Michael Foster',
//     date: '4d ago',
//     imageId: '1519244703995-f4e0f30006d5',
//     body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
//   },
//   {
//     id: 3,
//     name: 'Dries Vincent',
//     date: '4d ago',
//     imageId: '1506794778202-cad84cf45f1d',
//     body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
//   },
// ];

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
];

type AddNoteQ = AddNoteToCandidateRequisition;
type AddNoteV = AddNoteToCandidateRequisitionVariables;
type Props = {
  candidateRequisitionDetail: FindCandidateRequisitionDetailQuery['candidateRequisitionDetail'];
};
const CandidateRequisition: FC<Props> = ({
  candidateRequisitionDetail: { id, Candidate, Requisition, Notes },
}) => {
  const sortedNotes = [...Notes].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const [formReset, setFormReset] = useState<() => void>(() => () => {});
  const [attachmentExpanded, setAttachmentExpanded] = useState(false);
  const [addNote, { loading, error }] = useMutation<AddNoteQ, AddNoteV>(
    ADD_NOTE,
    {
      onCompleted: () => {
        toast.success('Note saved');
        formReset();
      },
      onError: (err) => {
        toast.error(err.message);
      },
      refetchQueries: ['FindCandidateRequisitionDetailQuery'],
      awaitRefetchQueries: true,
    }
  );

  const onSave = ({ content }: { content: string }) => {
    addNote({ variables: { input: { candidateRequisitionID: id, content } } });
  };
  const resetCallback = (cb: () => void) => {
    setFormReset(() => () => cb());
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full bg-gray-100">
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  {Candidate?.profilePictureURL ? (
                    <>
                      <img
                        className="h-16 w-16 rounded-full"
                        src={Candidate.profilePictureURL}
                        alt=""
                      />
                      <span
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <UserCircleIcon className="h-16 w-16 rounded-full" />
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {Candidate.name}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  Applied for{' '}
                  <Link
                    to={routes.schedulerRequisition({ id: Requisition.id })}
                    className="text-gray-900"
                  >
                    {Requisition.title}
                  </Link>{' '}
                  on <time dateTime="2020-08-25">August 25, 2020</time>
                </p>
              </div>
            </div>
            <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                Disqualify
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                Advance to offer
              </button>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Applicant Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Personal details and application.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Application for
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {Requisition.title}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {Candidate.email}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Salary expectation
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          +1 555-555-5555
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          About
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {Candidate.about ?? 'n/a'}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Attachments
                        </dt>
                        {Candidate?.Attachments?.length > 0 && (
                          <dd className="mt-1 text-sm text-gray-900">
                            <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                              {Candidate.Attachments?.map((attachment) => (
                                <li
                                  key={attachment.id}
                                  className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                >
                                  <div className="flex w-0 flex-1 items-center">
                                    <PaperClipIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="ml-2 w-0 flex-1 truncate">
                                      {attachment.title}
                                    </span>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <a
                                      href={attachment.url}
                                      className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        )}
                        {/* add attachments divider with button */}
                        <div className="relative">
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="w-full border-t border-gray-200" />
                          </div>
                          <div className="relative flex justify-center">
                            <button
                              className="inline-flex items-center rounded-full border border-gray-200 bg-blue-600 px-4 py-1.5 text-sm font-medium leading-5 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              onClick={() =>
                                setAttachmentExpanded((expanded) => !expanded)
                              }
                            >
                              <PlusIcon
                                className="-ml-1.5 mr-1 h-5 w-5 text-white"
                                aria-hidden="true"
                              />
                              <span>Add attachment</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <Transition
                        as="form"
                        className="col-span-full -mt-4"
                        show={attachmentExpanded}
                        enter="tranisition ease-out duration-100"
                        enterFrom="opacity-0 -translate-y-6"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-6"
                      >
                        <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-300"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative mt-0 cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </Transition>
                    </dl>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                    >
                      Read full application
                    </a>
                  </div>
                </div>
              </section>

              {/* Comments*/}
              <NotesList
                notes={sortedNotes}
                onSave={onSave}
                resetCallback={resetCallback}
                loading={loading}
                error={error}
              />
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-span-1 lg:col-start-3"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900"
                >
                  Timeline
                </h2>

                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                  <ul className="-mb-8">
                    {timeline.map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {itemIdx !== timeline.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={classNames(
                                  item.type.bgColorClass,
                                  'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white'
                                )}
                              >
                                <item.type.icon
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {item.content}{' '}
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {item.target}
                                  </a>
                                </p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                <time dateTime={item.datetime}>
                                  {item.date}
                                </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="justify-stretch mt-6 flex flex-col">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Advance to offer
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default CandidateRequisition;
