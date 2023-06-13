export const schema = gql`
  type ConfiguredOAuth {
    id: Int!
    userID: Int!
    customerProductID: Int!
    accessToken: String!
    refreshToken: String!
    expiryDate: DateTime!
    provider: OAuthProvider!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    customerProduct: CustomerProduct!
  }

  enum OAuthProvider {
    GOOGLE_WORKSPACE
    AZURE_AD
    ZOOM
  }

  type Query {
    configuredOAuths: [ConfiguredOAuth!]!
      @requireAuth(roles: ["evocs_internal", "admin"])
    configuredOAuth(id: Int!): ConfiguredOAuth
      @requireAuth(roles: ["evocs_internal", "admin"])
    userHasGoogleAuth(args: UserProduct!): Boolean @requireAuth
    hasGoogleAuth(productName: String!): Boolean! @requireAuth
  }

  input CreateConfiguredOAuthInput {
    userID: Int!
    productID: Int!
    oneTimeAuthToken: String!
    provider: OAuthProvider!
  }

  input UpdateConfiguredOAuthInput {
    userID: Int
    customerProductID: Int
    accessToken: String
    refreshToken: String
    expiryDate: DateTime
  }

  type Mutation {
    createConfiguredOAuth(input: CreateConfiguredOAuthInput!): ConfiguredOAuth!
      @requireAuth
    updateConfiguredOAuth(
      id: Int!
      input: UpdateConfiguredOAuthInput!
    ): ConfiguredOAuth! @requireAuth
    deleteConfiguredOAuth(id: Int!): ConfiguredOAuth! @requireAuth
  }
`;
