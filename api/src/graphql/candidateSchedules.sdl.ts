export const schema = gql`
  type CandidateSchedule {
    id: Int!
    candidateRequisitionID: Int! @requireAuth
    interviewStageID: Int! @requireAuth
    createdAt: DateTime! @requireAuth
    updatedAt: DateTime! @requireAuth
    scheduleSelections: [ScheduleSelection!]
    scheduleRequests: [CandidateScheduleRequest]!
    Candidate: Candidate!
    Requsition: Requisition!
    CandidateRequisition: CandidateRequisition!
    InterviewStage: InterviewStage!
  }

  type PublicCandidateSchedule {
    id: Int! @requireAuth
    firstName: String!
    lastName: String!
    scheduleSelections: [ScheduleSelection]
    title: String!
    status: String!
    positionType: PositionType!
    startTime: DateTime!
    endTime: DateTime!
  }

  input UpdatePublicCandidateScheduleInput {
    scheduleSelections: [CreateScheduleSelectionInput]!
  }

  type Query {
    candidateSchedules: [CandidateSchedule!]! @requireAuth
    candidateRequisitionSchedules(
      candidateRequisitionID: Int!
    ): [CandidateSchedule!]! @requireAuth
    oneCandidateSchedules(candidateID: Int!): [CandidateSchedule!]! @requireAuth
    candidateSchedule(id: Int!): CandidateSchedule @requireAuth
    publicCandidateSchedule(linkID: String!): PublicCandidateSchedule @skipAuth
  }

  input CreateCandidateScheduleInput {
    candidateID: Int!
    requisitionID: Int!
    interviewStageID: Int!
  }

  input UpdateCandidateScheduleInput {
    scheduleSelections: [CreateScheduleSelectionInput]!
  }

  type Mutation {
    createCandidateSchedule(
      input: CreateCandidateScheduleInput!
    ): CandidateSchedule! @requireAuth
    updateCandidateSchedule(
      linkID: String!
      input: UpdateCandidateScheduleInput!
    ): CandidateSchedule! @skipAuth
    updatePublicCandidateSchedule(
      linkID: String!
      input: UpdatePublicCandidateScheduleInput!
    ): PublicCandidateSchedule @skipAuth
  }
`;
