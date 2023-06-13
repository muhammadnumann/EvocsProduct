import type {
  QueryResolvers,
  MutationResolvers,
  CustomerProductEnabledTenantRelationResolvers,
} from 'types/graphql';

import { requireAuth, RoleList } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const customerProductEnabledTenants: QueryResolvers['customerProductEnabledTenants'] =
  () => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerProductEnabledTenant.findMany();
  };

export const customerProductEnabledTenant: QueryResolvers['customerProductEnabledTenant'] =
  ({ id }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerProductEnabledTenant.findUnique({
      where: { id },
    });
  };

export const createCustomerProductEnabledTenant: MutationResolvers['createCustomerProductEnabledTenant'] =
  ({ input }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerProductEnabledTenant.create({
      data: input,
    });
  };

export const updateCustomerProductEnabledTenant: MutationResolvers['updateCustomerProductEnabledTenant'] =
  ({ id, input }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerProductEnabledTenant.update({
      data: input,
      where: { id },
    });
  };

export const deleteCustomerProductEnabledTenant: MutationResolvers['deleteCustomerProductEnabledTenant'] =
  ({ id }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerProductEnabledTenant.delete({
      where: { id },
    });
  };

export const CustomerProductEnabledTenant: CustomerProductEnabledTenantRelationResolvers =
  {
    customerProduct: (_obj, { root }) =>
      db.customerProductEnabledTenant
        .findUnique({ where: { id: root.id } })
        .customerProduct(),
    customerTenant: (_obj, { root }) =>
      db.customerProductEnabledTenant
        .findUnique({ where: { id: root.id } })
        .customerTenant(),
  };
