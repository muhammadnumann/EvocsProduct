import { FC, useEffect, useState } from 'react';

import {
  UpdatePublicCandidateScheduleSelections,
  UpdatePublicCandidateScheduleSelectionsVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/dist/toast';

import { ArrayElement, PartialBy } from 'src/utils/types';

import Heading from './Heading/Heading';
import PublicCandidateScheduleWeekCalendar from './PublicCandidateScheduleWeekCalendar/PublicCandidateScheduleWeekCalendar';
import { Props } from './types';

type MutationReq = UpdatePublicCandidateScheduleSelections;
type MutationVariables = UpdatePublicCandidateScheduleSelectionsVariables;
const UPDATE_PUBLIC_CANDIDATE_SCHEDULE = gql`
  mutation UpdatePublicCandidateScheduleSelections(
    $linkID: String!
    $input: UpdatePublicCandidateScheduleInput!
  ) {
    updatePublicCandidateSchedule(linkID: $linkID, input: $input) {
      title
    }
  }
`;

export type ScheduleSelectionLike = PartialBy<
  ArrayElement<Props['scheduleSelections']>,
  'id'
>;

const PublicCandidateSchedule: FC<Props> = (props) => {
  const { scheduleSelections, linkID } = props;

  const [inEditMode, setInEditMode] = useState(!scheduleSelections?.length);
  const [selections, setSelections] =
    useState<ScheduleSelectionLike[]>(scheduleSelections);
  const saveEnabled =
    selections.length !== scheduleSelections.length ||
    !selections.every((s, i) => s === scheduleSelections[i]);
  const [updateScheduleSelctions] = useMutation<MutationReq, MutationVariables>(
    UPDATE_PUBLIC_CANDIDATE_SCHEDULE,
    {
      onCompleted: () => {
        setInEditMode(false);
        toast.success('Schedule saved');
      },
      onError: (error) => {
        console.log(error);
        toast.error('There was an error saving your schedule selections');
      },
      refetchQueries: ['FindCandidateSuppliedScheduleQuery'],
      awaitRefetchQueries: true,
    }
  );

  const onSave = async () => {
    updateScheduleSelctions({
      variables: {
        linkID,
        input: {
          scheduleSelections: selections.map(({ startTime, endTime }) => ({
            startTime,
            endTime,
          })),
        },
      },
    });
  };

  const addSelection = ({ startTime, endTime }: ScheduleSelectionLike) =>
    setSelections([...selections, { startTime, endTime }]);

  const removeSelection = ({ startTime, endTime }: ScheduleSelectionLike) =>
    setSelections(
      selections.filter(
        ({ startTime: start, endTime: end }) =>
          !(startTime === start && endTime === end)
      )
    );

  const toggleEditMode = () => {
    if (inEditMode) {
      setSelections(scheduleSelections);
    }
    setInEditMode(!inEditMode);
  };

  useEffect(() => {
    setSelections(scheduleSelections);
  }, [scheduleSelections]);

  return (
    <div className="mx-auto h-screen max-w-7xl py-4 px-4 sm:overflow-y-hidden sm:px-6 lg:px-8">
      <Toaster />
      <header className="">
        <Heading
          {...props}
          inEditMode={inEditMode}
          setInEditMode={toggleEditMode}
          saveEnabled={saveEnabled}
          onSave={onSave}
        />
      </header>
      <main className="h-full">
        <div className="mx-auto h-full max-w-full">
          <div className="h-full pt-4 pb-20">
            <div className="h-full rounded-lg border-4 border-dashed border-gray-200">
              <PublicCandidateScheduleWeekCalendar
                {...props}
                inEditMode={inEditMode}
                scheduleSelections={selections}
                addSelection={addSelection}
                removeSelection={removeSelection}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicCandidateSchedule;
