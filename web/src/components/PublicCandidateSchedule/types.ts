import { FindCandidateSuppliedScheduleQuery } from 'types/graphql';

export type Props =
  FindCandidateSuppliedScheduleQuery['candidateSuppliedSchedule'] & {
    linkID: string;
  };
