export const schema = gql`
  type CustomerProductEnabledTenant {
    customerProduct: CustomerProduct!
    customerTenant: CustomerTenant!
    id: Int!
    customerProductID: Int!
    customerTenantID: Int!
  }

  type Query {
    customerProductEnabledTenants: [CustomerProductEnabledTenant!]! @requireAuth
    customerProductEnabledTenant(id: Int!): CustomerProductEnabledTenant
      @requireAuth
  }

  input CreateCustomerProductEnabledTenantInput {
    customerProductID: Int!
    customerTenantID: Int!
  }

  input UpdateCustomerProductEnabledTenantInput {
    customerProductID: Int
    customerTenantID: Int
  }

  type Mutation {
    createCustomerProductEnabledTenant(
      input: CreateCustomerProductEnabledTenantInput!
    ): CustomerProductEnabledTenant! @requireAuth
    updateCustomerProductEnabledTenant(
      id: Int!
      input: UpdateCustomerProductEnabledTenantInput!
    ): CustomerProductEnabledTenant! @requireAuth
    deleteCustomerProductEnabledTenant(id: Int!): CustomerProductEnabledTenant!
      @requireAuth
  }
`;
