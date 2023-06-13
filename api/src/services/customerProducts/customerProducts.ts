import type {
  QueryResolvers,
  MutationResolvers,
  CustomerProductRelationResolvers,
} from 'types/graphql';

import { requireAuth, RoleList } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const customerProducts: QueryResolvers['customerProducts'] = () => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.customerProduct.findMany();
};

export const customerProduct: QueryResolvers['customerProduct'] = ({ id }) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.customerProduct.findUnique({
    where: { id },
  });
};

export const customerProductByUserID: QueryResolvers['customerProductByUserID'] =
  async ({ input: { userID, productID } }) => {
    requireAuth({
      roles: [
        RoleList.EvocsInternal,
        RoleList.Admin,
        RoleList.JobServiceWorker,
      ],
    });

    const { customerID } = await db.user.findUnique({ where: { id: userID } });

    return db.customerProduct.findUnique({
      where: {
        customerID_productID: {
          customerID,
          productID,
        },
      },
    });
  };

export const createCustomerProduct: MutationResolvers['createCustomerProduct'] =
  async ({ input }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });

    return db.customerProduct.create({
      data: input,
    });

    // return await db.$transaction(async (prisma) => {
    //   const customer = await prisma.customer.findUnique({
    //     where: { id: input.customerID },
    //   });
    //   const cp = await prisma.customerProduct.create({
    //     data: input,
    //   });

    //   const config: ActivityPreservationConfig = JSON.parse(
    //     input.config.toString()
    //   );

    //   const client = getProductRunnerClient();
    //   const body = createScheduleActivityPreservationRequest({
    //     customerID: input.customerID,
    //     enabledReports: config.enabledReports,
    //     tenantURLs: config.tenantURLs,
    //     customerSecretID: customer.vaultKey,
    //     frequencyMinutes: config.frequencyMinutes,
    //   });

    //   const resp = await client.registerActivityPreservationCustomer(body);
    //   logger.info({ resp }, 'activity preservation request created');

    //   return cp;
    // });
  };

export const updateCustomerProduct: MutationResolvers['updateCustomerProduct'] =
  async ({ id, input }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });

    if (!input.config) {
      return db.customerProduct.update({
        data: input,
        where: { id },
      });
    }

    return await db.$transaction(async (prisma) => {
      const cp = await prisma.customerProduct.update({
        data: input,
        where: { id },
      });
      return cp;

      // const customer = await prisma.customer.findUnique({
      //   where: { id: input.customerID },
      // });
      // const config: ActivityPreservationConfig = JSON.parse(
      //   input.config.toString()
      // );

      // const client = getProductRunnerClient();
      // const body = createScheduleActivityPreservationRequest({
      //   customerID: input.customerID,
      //   enabledReports: config.enabledReports,
      //   tenantURLs: config.tenantURLs,
      //   customerSecretID: customer.vaultKey,
      //   frequencyMinutes: config.frequencyMinutes,
      // });

      // const resp = await client.registerActivityPreservationCustomer(body);
      // logger.info({ resp }, 'activity preservation request updated');

      // return cp;
    });
  };

export const deleteCustomerProduct: MutationResolvers['deleteCustomerProduct'] =
  ({ id }) => {
    requireAuth({ roles: [RoleList.Admin] });
    return db.customerProduct.delete({
      where: { id },
    });
  };

export const CustomerProduct: CustomerProductRelationResolvers = {
  product: (_obj, { root }) =>
    db.customerProduct.findUnique({ where: { id: root.id } }).product(),
  customer: (_obj, { root }) =>
    db.customerProduct.findUnique({ where: { id: root.id } }).customer(),
  tenants: (_obj, { root }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerProduct.findUnique({ where: { id: root.id } }).tenants();
  },
  requiredOAuth: (_obj, { root: { id } }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.customerProduct.findUnique({ where: { id } }).requiredOAuth();
  },
};
