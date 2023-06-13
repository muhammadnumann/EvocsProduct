export const schema = gql`
  type Customer {
    users: [User]!
    enabledProducts: [CustomerProduct]!
    tenants: [CustomerTenant]!
    id: Int!
    auth0ID: String
    name: String!
    displayName: String
    status: AccountStatus!
    vaultKey: String!
    createdAt: DateTime!
    updatedAt: DateTime!

    Attachments: [Attachment]!
  }

  enum AccountStatus {
    PENDING
    ACTIVE
    DISABLED
  }

  type Query {
    customers: [Customer!]! @requireAuth(roles: ["evocs_internal", "admin"])
    customer(id: Int!): Customer
      @requireAuth(roles: ["evocs_internal", "admin"])
  }

  input CreateCustomerInput {
    auth0ID: String
    name: String!
    displayName: String
    status: AccountStatus!
    vaultKey: String!
  }

  input UpdateCustomerInput {
    auth0ID: String
    name: String
    displayName: String
    status: AccountStatus
    vaultKey: String
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer!
      @requireAuth(roles: ["evocs_internal", "admin"])
    updateCustomer(id: Int!, input: UpdateCustomerInput!): Customer!
      @requireAuth(roles: ["evocs_internal", "admin"])
    deleteCustomer(id: Int!): Customer! @requireAuth(roles: ["admin"])
  }
`;
