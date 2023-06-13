export const schema = gql`
  type Candidate {
    id: Int!
    owningCustomerID: Int!
    addedByUserID: Int!
    firstName: String!
    lastName: String!
    preferredName: String
    # need to mark this as optional even though it is in practice
    # always set to get tsc to shut up.
    # dependent on https://github.com/redwoodjs/redwood/issues/6896
    name: String
    email: String!
    homePhone: String
    mobilePhone: String
    about: String
    wdCandidateID: String!
    profilePictureURL: String
    createdAt: DateTime!
    updatedAt: DateTime!

    customer: Customer!
    user: User!
    candidateSchedules: [CandidateSchedule]!
    candidateScheduleRequests: [CandidateScheduleRequest]!
    requsitions: [Requisition]!
    Attachments: [Attachment]!
    Notes: [Note]!
  }

  input CandidatesFilter {
    createdByUserOnly: Boolean
    limit: Int
    skip: Int
  }

  type Query {
    candidates(filter: CandidatesFilter): [Candidate!]! @requireAuth
    candidate(id: Int!): Candidate @requireAuth
  }

  input CreateCandidateInput {
    firstName: String!
    lastName: String!
    preferredName: String
    email: String!
    homePhone: String
    mobilePhone: String
    notes: String
    wdCandidateID: String!
  }

  input UpdateCandidateInput {
    firstName: String
    lastName: String
    preferredName: String
    email: String
    homePhone: String
    mobilePhone: String
    notes: String
    wdCandidateID: String
  }

  type Mutation {
    createCandidate(input: CreateCandidateInput!): Candidate! @requireAuth
    updateCandidate(id: Int!, input: UpdateCandidateInput!): Candidate!
      @requireAuth
    deleteCandidate(id: Int!): Candidate! @requireAuth
  }
`;
