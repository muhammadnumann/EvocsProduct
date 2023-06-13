export const schema = gql`
  type ServiceAccountAuthHealthCheck {
    authenticated: Boolean!
  }

  type Query {
    isAuthenticatedServiceAccount: ServiceAccountAuthHealthCheck!
      @requireAuth(roles: ["job_service_worker"])
  }
`;
