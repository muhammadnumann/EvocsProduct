export const schema = gql`
  type Note {
    id: Int!
    content: String!
    addedByUserID: Int!
    createdAt: DateTime!
    upatedAt: DateTime!
    Candidate: Candidate
    CandidateRequsitions: CandidateRequisition
    User: User!
  }

  type Query {
    note(id: Int!): Note @requireAuth
    notes(candidateRequisitionID: Int!): [Note!]! @requireAuth
  }

  input CreateNoteInput {
    candidateRequisitionID: Int!
    content: String!
  }

  input UpdateNoteInput {
    content: String!
  }

  type Mutation {
    createNote(input: CreateNoteInput!): Note! @requireAuth
    updateNote(id: Int!, input: UpdateNoteInput!): Note! @requireAuth
    deleteNote(id: Int!): Note! @requireAuth
  }
`;
