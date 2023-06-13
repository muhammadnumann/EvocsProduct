export const schema = gql`
  type ScheduleSelection {
    id: Int!
    startTime: DateTime!
    endTime: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    CandidateSchedules: [CandidateSchedule] @requireAuth
  }

  type Query {
    candidateScheduleSelections(
      candidateScheduleID: Int!
    ): [ScheduleSelection!]! @requireAuth
  }

  input CreateScheduleSelectionInput {
    startTime: DateTime!
    endTime: DateTime!
  }

  input UpdateScheduleSelectionInput {
    startTime: DateTime
    endTime: DateTime
  }
`;
