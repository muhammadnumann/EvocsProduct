export const schema = gql`
  type RequiredOAuth {
    id: Int!
    customerProductID: Int!
    google: Boolean!
    azureAD: Boolean!
    adFS: Boolean!
    ping: Boolean!
    adLDAP: Boolean!
    zoom: Boolean!
    customerProduct: CustomerProduct!
  }

  type Query {
    userCanConfigureProductAuth(args: UserProduct!): Boolean! @requireAuth
    requiredOAuthForProduct(args: UserProduct!): RequiredOAuth! @requireAuth
    requiredOAuthByProductTitle(title: String!): RequiredOAuth! @requireAuth
    configuredOAuthByProductTitle(title: String!): RequiredOAuth! @requireAuth
    requiredOAuths: [RequiredOAuth!]!
      @requireAuth(roles: ["evocs_internal", "admin"])
    requiredOAuth(id: Int!): RequiredOAuth
      @requireAuth(roles: ["evocs_internal", "admin"])
  }

  input CreateRequiredOAuthInput {
    customerProductID: Int!
    google: Boolean!
    azureAD: Boolean!
    adFS: Boolean!
    ping: Boolean!
    adLDAP: Boolean!
    zoom: Boolean!
  }

  input UpdateRequiredOAuthInput {
    customerProductID: Int
    google: Boolean
    azureAD: Boolean
    adFS: Boolean
    ping: Boolean
    adLDAP: Boolean
    zoom: Boolean
  }

  type Mutation {
    createRequiredOAuth(input: CreateRequiredOAuthInput!): RequiredOAuth!
      @requireAuth(roles: ["evocs_internal", "admin"])
    updateRequiredOAuth(
      id: Int!
      input: UpdateRequiredOAuthInput!
    ): RequiredOAuth! @requireAuth(roles: ["evocs_internal", "admin"])
    deleteRequiredOAuth(id: Int!): RequiredOAuth!
      @requireAuth(roles: ["evocs_internal", "admin"])
  }
`;
