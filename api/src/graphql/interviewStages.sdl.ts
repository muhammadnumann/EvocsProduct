export const schema = gql`
  type InterviewStage {
    id: Int!
    requisitionID: Int!
    title: String!
    pipelinePosition: Int!
    Requisition: Requisition!
    InterviewSchedulerEvents: [InterviewSchedulerEvent]!
    CandidateScheduleRequests: [CandidateScheduleRequest]!
    CandidateSchedules: [CandidateSchedule]!
  }

  type Query {
    interviewStages: [InterviewStage!]! @requireAuth
    interviewStage(id: Int!): InterviewStage @requireAuth
  }

  input CreateInterviewStageInput {
    requisitionID: Int!
    title: String!
    pipelinePosition: Int!
  }

  input UpdateInterviewStageInput {
    requisitionID: Int
    title: String
    pipelinePosition: Int
  }

  type Mutation {
    createInterviewStage(input: CreateInterviewStageInput!): InterviewStage!
      @requireAuth
    updateInterviewStage(
      id: Int!
      input: UpdateInterviewStageInput!
    ): InterviewStage! @requireAuth
    deleteInterviewStage(id: Int!): InterviewStage! @requireAuth
  }
`;
