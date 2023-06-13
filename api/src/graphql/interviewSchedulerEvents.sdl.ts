export const schema = gql`
  type InterviewSchedulerEvent {
    id: Int!
    userID: Int!
    customerID: Int!
    attendees: [InterviewSchedulerEventAttendee]!
    calendarProvider: CalendarProvider!
    conferencingProvider: ConferencingProvider
    title: String!
    description: String!
    startTime: DateTime!
    endTime: DateTime!
    requisitionID: Int!
    candidateID: Int!
    candidateRequisitionID: Int!
    createdAt: DateTime!
    updatedAt: DateTime!

    user: User!
    customer: Customer!
    requisition: Requisition!
    candidate: Candidate!
    CandidateRequisition: CandidateRequisition!
  }

  enum CalendarProvider {
    GOOGLE
    OFFICE365
  }

  enum ConferencingProvider {
    GOOGLEHANGOUTS
    ZOOM
    TEAMS
  }

  input InterviewSchedulerEventsFilter {
    startDate: DateTime
    endDate: DateTime
    limit: Int
  }

  type Query {
    interviewSchedulerEvents(
      filter: InterviewSchedulerEventsFilter!
    ): [InterviewSchedulerEvent!]! @requireAuth
    interviewSchedulerEvent(id: Int!): InterviewSchedulerEvent @requireAuth
  }

  input CreateInterviewSchedulerEventInput {
    userID: Int!
    attendees: [UpsertInterviewSchedulerEventAttendeeInput]!
    calendarProvider: CalendarProvider!
    conferencingProvider: ConferencingProvider
    title: String!
    description: String!
    startTime: DateTime!
    endTime: DateTime!
    requisitionID: Int!
    candidateID: Int!
    interviewStageID: Int!
  }

  input UpdateInterviewSchedulerEventInput {
    userID: Int
    customerID: Int
    attendees: [UpsertInterviewSchedulerEventAttendeeInput]
    calendarProvider: CalendarProvider
    conferencingProvider: ConferencingProvider
    title: String
    description: String
    startTime: DateTime
    endTime: DateTime
    requisitionID: Int!
  }

  type Mutation {
    createInterviewSchedulerEvent(
      input: CreateInterviewSchedulerEventInput!
    ): InterviewSchedulerEvent! @requireAuth
    updateInterviewSchedulerEvent(
      id: Int!
      input: UpdateInterviewSchedulerEventInput!
    ): InterviewSchedulerEvent! @requireAuth
    deleteInterviewSchedulerEvent(id: Int!): InterviewSchedulerEvent!
      @requireAuth
  }
`;
