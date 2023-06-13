export const schema = gql`
  type CandidateRequisition {
    id: Int!
    candidateID: Int!
    requisitionID: Int!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    Candidate: Candidate!
    Requisition: Requisition!
    CandidateSchedules: [CandidateSchedule]!
    candidateScheduleId: Int

    Notes: [Note]!
  }

  type Query {
    candidateRequisitions: [CandidateRequisition!]! @requireAuth
    candidateRequisition(id: Int!): CandidateRequisition @requireAuth
  }

  input CreateCandidateRequisitionInput {
    candidateID: Int!
    requisitionID: Int!
    status: String!
    candidateScheduleId: Int
  }

  input UpdateCandidateRequisitionInput {
    candidateID: Int
    requisitionID: Int
    status: String
    candidateScheduleId: Int
  }

  type Mutation {
    createCandidateRequisition(
      input: CreateCandidateRequisitionInput!
    ): CandidateRequisition! @requireAuth
    updateCandidateRequisition(
      id: Int!
      input: UpdateCandidateRequisitionInput!
    ): CandidateRequisition! @requireAuth
    deleteCandidateRequisition(id: Int!): CandidateRequisition! @requireAuth
  }
`;
