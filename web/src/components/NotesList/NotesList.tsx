import { FC, useEffect } from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import {
  CreateNoteInput,
  FindCandidateRequisitionDetailQuery,
} from 'types/graphql';

import {
  FieldError,
  Form,
  FormError,
  Label,
  RWGqlError,
  Submit,
  TextAreaField,
  useForm,
} from '@redwoodjs/forms';
import { Link, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import { ArrayElement } from 'src/utils/types';
import { timeSince } from 'src/utils/utils';

type Note = ArrayElement<
  FindCandidateRequisitionDetailQuery['candidateRequisitionDetail']['Notes']
>;

type FormNote = NonNullable<Pick<CreateNoteInput, 'content'>>;

type Props = {
  notes: Note[];
  // onSave: MutationFunction<Note, CreateNoteInput>;
  onSave: (input: FormNote) => void;
  resetCallback: (cb: () => void) => void;
  error: RWGqlError;
  loading: boolean;
};
const NotesList: FC<Props> = ({
  notes,
  onSave,
  error,
  loading,
  resetCallback,
}) => {
  const { currentUser: user } = useAuth();
  const formMethods = useForm<FormNote>();

  useEffect(() => {
    resetCallback(() => formMethods.reset());
  }, []);

  const onSubmit = (data: FormNote) => {
    onSave(data);
  };

  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Notes
            </h2>
          </div>
          {notes.length > 0 && (
            <div className="px-4 py-6 sm:px-6">
              <ul className="space-y-8">
                {notes.map(({ User, ...note }) => (
                  <li key={note.id} className="block">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={User.avatarURL}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="text-sm">
                          <Link
                            to={routes.user({ id: User.id })}
                            className="font-medium text-gray-900"
                          >
                            {User.name}
                          </Link>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          <p>{note.content}</p>
                        </div>
                        <div className="mt-2 flex justify-start space-x-2 text-sm">
                          <span className="font-medium text-gray-500">
                            {timeSince(new Date(note.createdAt))}
                          </span>{' '}
                          <span className="font-medium text-gray-500">
                            &middot;
                          </span>{' '}
                          <button
                            type="button"
                            className="font-medium text-gray-900"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                referrerPolicy="no-referrer"
                src={user?.userInfo.picture}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <Form<FormNote>
                onSubmit={onSubmit}
                error={error}
                formMethods={formMethods}
              >
                <div>
                  <FormError
                    error={error}
                    wrapperClassName="rw-form-error-wrapper"
                    titleClassName="rw-form-error-title"
                    listClassName="rw-form-error-list"
                  />
                  <Label
                    name="content"
                    className="sr-only"
                    errorClassName="text-red-700"
                  >
                    About
                  </Label>
                  <TextAreaField
                    name="content"
                    defaultValue={''}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Add a note"
                    validation={{ required: true }}
                  />
                  <FieldError
                    name="content"
                    className="mt-1 block text-xs font-semibold uppercase text-red-700"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <a
                    href="#"
                    className="group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900"
                  >
                    <QuestionMarkCircleIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span>Some HTML is okay.</span>
                  </a>
                  <Submit
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Comment
                  </Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesList;
