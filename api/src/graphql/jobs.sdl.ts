export const schema = gql`
  type Job {
    id: Int!
    status: JobStatus!
    user: User!
    initiatingUserID: Int!
    product: Product!
    productID: Int!
    resultBlob: JSON
    resultURL: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum JobStatus {
    PENDING
    ACTIVE
    DONE
    FAILED
  }

  type Query {
    jobs: [Job!]! @requireAuth
    job(id: Int!): Job @requireAuth
  }

  input CreateJobInput {
    status: JobStatus!
    initiatingUserID: Int!
    productID: Int!
    resultBlob: JSON
    resultURL: String
  }

  input UpdateJobInput {
    status: JobStatus
    initiatingUserID: Int
    productID: Int
    resultBlob: JSON
    resultURL: String
  }

  type Mutation {
    createJob(input: CreateJobInput!): Job! @requireAuth
    updateJob(id: Int!, input: UpdateJobInput!): Job!
      @requireAuth(roles: ["job_service_worker", "admin"])
    deleteJob(id: Int!): Job! @requireAuth(roles: ["evocs_internal", "admin"])
  }
`;
