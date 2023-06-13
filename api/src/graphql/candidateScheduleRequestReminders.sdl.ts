export const schema = gql`
  type CandidateScheduleRequestReminder {
    id: Int!
    candidateScheduleRequestID: Int!
    emailServiceMessageID: String!
      @requireAuth(roles: ["evocs_internal", "admin", "job_service_worker"])
    createdAt: DateTime!
    updatedAt: DateTime!
    candidateScheduleRequest: CandidateScheduleRequest!
  }

  type Query {
    candidateScheduleRequestReminders(
      candidateScheduleRequestID: Int!
    ): [CandidateScheduleRequestReminder!]! @requireAuth
    candidateScheduleRequestReminder(
      id: Int!
    ): CandidateScheduleRequestReminder @requireAuth
  }

  input CreateCandidateScheduleRequestReminderInput {
    candidateScheduleRequestID: Int!
  }

  input UpdateCandidateScheduleRequestReminderInput {
    emailServiceMessageID: String
  }

  type Mutation {
    createCandidateScheduleRequestReminder(
      input: CreateCandidateScheduleRequestReminderInput!
    ): CandidateScheduleRequestReminder! @requireAuth
    updateCandidateScheduleRequestReminder(
      id: Int!
      input: UpdateCandidateScheduleRequestReminderInput!
    ): CandidateScheduleRequestReminder!
      @requireAuth(roles: ["job_service_worker"])
  }
`;
