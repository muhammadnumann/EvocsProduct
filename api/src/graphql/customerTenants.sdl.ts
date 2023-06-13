export const schema = gql`
  type CustomerTenant {
    customer: Customer!
    customerProductEnabledOn: [CustomerProductEnabledTenant]!
    id: Int!
    customerID: Int!
    url: String!
    vaultKey: String
  }

  type Query {
    customerTenants: [CustomerTenant!]!
      @requireAuth(roles: ["evocs_internal", "admin"])
    customerTenant(id: Int!): CustomerTenant
      @requireAuth(roles: ["evocs_internal", "admin"])
  }

  input CreateCustomerTenantInput {
    customerID: Int!
    url: String!
    vaultKey: String
  }

  input UpdateCustomerTenantInput {
    customerID: Int
    url: String
    vaultKey: String
  }

  type Mutation {
    createCustomerTenant(input: CreateCustomerTenantInput!): CustomerTenant!
      @requireAuth(roles: ["evocs_internal", "admin"])
    updateCustomerTenant(
      id: Int!
      input: UpdateCustomerTenantInput!
    ): CustomerTenant! @requireAuth(roles: ["evocs_internal", "admin"])
    deleteCustomerTenant(id: Int!): CustomerTenant!
      @requireAuth(roles: ["evocs_internal", "admin"])
  }
`;
