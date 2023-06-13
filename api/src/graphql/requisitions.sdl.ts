export const schema = gql`
  enum PositionType {
    CONTRACT
    FULLTIME
  }

  type Requisition {
    id: Int!
    owningCustomerID: Int!
    owningUserID: Int!
    title: String!
    summary: String
    wdRequisitionID: Int!
    status: String!
    positionType: PositionType!
    createdAt: DateTime!
    updatedAt: DateTime!
    Candidates: [Candidate]!
    Customer: Customer!
    User: User!
    CandidateRequisitions: [CandidateRequisition]
    Attachments: [Attachment]!
  }

  input RequisitionsFilter {
    createdByUserOnly: Boolean
    limit: Int
    skip: Int
  }

  type Query {
    requisitions(filter: RequisitionsFilter): [Requisition!]! @requireAuth
    requisition(id: Int!): Requisition @requireAuth
  }

  input CreateRequisitionInput {
    title: String!
    summary: String
    wdRequisitionID: Int!
    positionType: PositionType!
  }

  input UpdateRequisitionInput {
    title: String
    summary: String
    status: String
    positionType: PositionType
  }

  type Mutation {
    createRequisition(input: CreateRequisitionInput!): Requisition! @requireAuth
    updateRequisition(id: Int!, input: UpdateRequisitionInput!): Requisition!
      @requireAuth
    deleteRequisition(id: Int!): Requisition! @requireAuth
  }
`;
