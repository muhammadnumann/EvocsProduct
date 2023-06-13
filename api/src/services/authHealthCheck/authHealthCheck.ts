import { QueryResolvers } from 'types/graphql';

import { requireAuth, RoleList } from 'src/lib/auth';

export const isAuthenticatedServiceAccount: QueryResolvers['isAuthenticatedServiceAccount'] =
  () => {
    requireAuth({ roles: [RoleList.JobServiceWorker] });
    return { authenticated: true };
  };
