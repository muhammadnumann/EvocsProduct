export const schema = gql`
  type CustomerProduct {
    id: Int!
    product: Product!
    customer: Customer!
    productID: Int!
    customerID: Int!
    config: JSON!
    tenants: [CustomerProductEnabledTenant]!
    requiredOAuth: RequiredOAuth
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CustomerProductByUserInput {
    productID: Int!
    userID: Int!
  }

  type Query {
    customerProducts: [CustomerProduct!]!
      @requireAuth(roles: ["evocs_internal", "admin"])
    customerProduct(id: Int!): CustomerProduct
      @requireAuth(roles: ["evocs_internal", "admin"])
    customerProductByUserID(
      input: CustomerProductByUserInput!
    ): CustomerProduct!
      @requireAuth(roles: ["evocs_internal", "admin", "job_service_worker"])
  }

  input CreateCustomerProductInput {
    productID: Int!
    customerID: Int!
    config: JSON!
  }

  input UpdateCustomerProductInput {
    productID: Int
    customerID: Int
    config: JSON
  }

  type Mutation {
    createCustomerProduct(input: CreateCustomerProductInput!): CustomerProduct!
      @requireAuth(roles: ["evocs_internal", "admin"])
    updateCustomerProduct(
      id: Int!
      input: UpdateCustomerProductInput!
    ): CustomerProduct! @requireAuth(roles: ["evocs_internal", "admin"])
    deleteCustomerProduct(id: Int!): CustomerProduct!
      @requireAuth(roles: ["evocs_internal", "admin"])
  }
`;
