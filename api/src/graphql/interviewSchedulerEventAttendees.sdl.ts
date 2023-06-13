export const schema = gql`
  type InterviewSchedulerEventAttendee {
    id: Int!
    eventID: Int!
    attendeeURI: String!
    name: String!
    email: String!
    inviteStatus: CalendarInviteStatus!
    avatarURL: String
    interviewSchedulerEvent: InterviewSchedulerEvent!
  }

  enum CalendarInviteStatus {
    PENDING
    DECLINED
    MAYBE
    ACCEPTED
  }

  type Query {
    interviewSchedulerEventAttendees: [InterviewSchedulerEventAttendee!]!
      @requireAuth(roles: ["evocs_internal", "admin"])
    interviewSchedulerEventAttendee(id: Int!): InterviewSchedulerEventAttendee
      @requireAuth
    interviewSchedulerEventAttendeesForEvent(
      eventID: Int!
    ): [InterviewSchedulerEventAttendee!]! @requireAuth
  }

  input UpsertInterviewSchedulerEventAttendeeInput {
    id: Int
    attendeeURI: String!
    name: String!
    email: String!
    inviteStatus: CalendarInviteStatus!
    avatarURL: String
  }

  # input CreateInterviewSchedulerEventAttendeeInput {
  #   eventID: Int!
  #   attendeeURI: String!
  #   name: String!
  #   email: String!
  #   inviteStatus: CalendarInviteStatus!
  #   avatarURL: String
  # }

  input UpdateInterviewSchedulerEventAttendeeInput {
    attendeeURI: String
    name: String
    email: String
    inviteStatus: CalendarInviteStatus
  }

  type Mutation {
    # createInterviewSchedulerEventAttendee(
    #   input: CreateInterviewSchedulerEventAttendeeInput!
    # ): InterviewSchedulerEventAttendee! @requireAuth
    updateInterviewSchedulerEventAttendee(
      id: Int!
      input: UpdateInterviewSchedulerEventAttendeeInput!
    ): InterviewSchedulerEventAttendee! @requireAuth
    deleteInterviewSchedulerEventAttendee(
      id: Int!
    ): InterviewSchedulerEventAttendee! @requireAuth
  }
`;
