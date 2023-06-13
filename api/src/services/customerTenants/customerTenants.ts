import type {
  QueryResolvers,
  MutationResolvers,
  CustomerTenantRelationResolvers,
} from 'types/graphql';

import { requireAuth, RoleList } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const customerTenants: QueryResolvers['customerTenants'] = () => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.customerTenant.findMany();
};

export const customerTenant: QueryResolvers['customerTenant'] = ({ id }) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.customerTenant.findUnique({
    where: { id },
  });
};

export const createCustomerTenant: MutationResolvers['createCustomerTenant'] =
  ({ input }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerTenant.create({
      data: input,
    });
  };

export const updateCustomerTenant: MutationResolvers['updateCustomerTenant'] =
  ({ id, input }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerTenant.update({
      data: input,
      where: { id },
    });
  };

export const deleteCustomerTenant: MutationResolvers['deleteCustomerTenant'] =
  ({ id }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerTenant.delete({
      where: { id },
    });
  };

export const CustomerTenant: CustomerTenantRelationResolvers = {
  customer: (_obj, { root }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerTenant.findUnique({ where: { id: root.id } }).customer();
  },
  customerProductEnabledOn: (_obj, { root }) =>
    db.customerTenant
      .findUnique({ where: { id: root.id } })
      .customerProductEnabledOn(),
};
