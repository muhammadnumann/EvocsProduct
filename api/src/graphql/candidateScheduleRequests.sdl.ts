export const schema = gql`
  type CandidateScheduleRequest {
    id: Int!
    candidateID: Int!
    candidateRequisitionID: Int!
    interviewStageID: Int!
    initiatingUserID: Int!
    candidateScheduleID: Int!
    emailSentFromName: String!
    emailSentFromAddressAlias: String!
    emailSubject: String!
    emailBody: String!
    emailServiceMessageID: String!
    linkID: String!
      @requireAuth(roles: ["evocs_internal", "admin", "job_service_worker"])
    linkClickedAt: DateTime
    startTime: DateTime!
    endTime: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    initiatingUser: User!
    candidate: Candidate!
    candidateSchedule: CandidateSchedule!
    reminders: [CandidateScheduleRequestReminder]!
    CandidateRequisition: CandidateRequisition!
    InterviewStage: InterviewStage!
  }

  type Query {
    candidateScheduleRequest(id: Int!): CandidateScheduleRequest @requireAuth
    candiDateScheduleRequestLink(linkID: Int!): CandidateScheduleRequest
      @skipAuth
    candidateScheduleRequests: [CandidateScheduleRequest] @requireAuth
  }

  input CreateCandidateScheduleRequestInput {
    candidateID: Int!
    requisitionID: Int!
    interviewStageID: Int!
    candidateScheduleID: Int!
    emailSentFromName: String!
    emailSentFromAddressAlias: String!
    emailSubject: String!
    emailBody: String!
    startTime: DateTime!
    endTime: DateTime!
  }

  input UpdateCandidateScheduleRequestInput {
    emailServiceMessageID: String
    linkClickedAt: DateTime
  }

  type Mutation {
    createCandidateScheduleRequest(
      input: CreateCandidateScheduleRequestInput!
    ): CandidateScheduleRequest! @requireAuth
    updateCandidateScheduleRequest(
      id: Int!
      input: UpdateCandidateScheduleRequestInput!
    ): CandidateScheduleRequest!
      @requireAuth(roles: ["evocs_internal", "admin", "job_service_worker"])
    deleteCandidateScheduleRequest(id: Int!): CandidateScheduleRequest!
      @requireAuth
  }
`;
