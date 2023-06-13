export const schema = gql`
  type Attachment {
    id: Int!
    key: String!
    title: String!
    url: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    Candidates: [Candidate]!
    Requisitions: [Requisition]!
    User: User!
    Customer: Customer!
  }

  type AttachmentUploadData {
    key: String!
    url: String!
  }

  type Query {
    attachment(id: Int!): Attachment @requireAuth
    getPresignedUploadURL(title: String!): AttachmentUploadData! @requireAuth
  }

  input CreateAttachmentInput {
    key: String!
    title: String!
    url: String!
  }

  type Mutation {
    createAttachment(input: CreateAttachmentInput!): Attachment! @requireAuth
    deleteAttachment(id: Int!): Attachment! @requireAuth
  }
`;
