import type {
  QueryResolvers,
  MutationResolvers,
  ProductRelationResolvers,
} from 'types/graphql';

import { hasRole, requireAuth, RoleList } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const products: QueryResolvers['products'] = async () => {
  if (hasRole([RoleList.EvocsInternal, RoleList.Admin])) {
    return db.product.findMany();
  }
  const rows = await db.product.findMany({ where: { published: true } });
  return rows.map((row) => {
    delete row.config;
    return row;
  });
};

export const product: QueryResolvers['product'] = async ({ id }) => {
  if (hasRole([RoleList.EvocsInternal, RoleList.Admin])) {
    return db.product.findUnique({
      where: { id },
    });
  }

  const row = await db.product.findFirst({
    where: { id, published: true },
  });
  delete row.config;
  return row;
};

export const productByTitle: QueryResolvers['productByTitle'] = ({ title }) => {
  requireAuth({
    roles: [RoleList.Admin, RoleList.EvocsInternal, RoleList.JobServiceWorker],
  });

  return db.product.findUnique({ where: { title } });
};

export const createProduct: MutationResolvers['createProduct'] = ({
  input,
}) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  if (!hasRole(RoleList.Admin)) {
    input.published = false;
  }
  return db.product.create({
    data: { ...input },
  });
};

export const updateProduct: MutationResolvers['updateProduct'] = ({
  id,
  input,
}) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  if (!hasRole(RoleList.Admin)) {
    input.published = false;
  }

  return db.product.update({
    data: input,
    where: { id },
  });
};

export const deleteProduct: MutationResolvers['deleteProduct'] = ({ id }) => {
  requireAuth({ roles: [RoleList.Admin] });
  return db.product.delete({
    where: { id },
  });
};

export const Product: ProductRelationResolvers = {
  enabledCustomers: (_obj, { root }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.product.findUnique({ where: { id: root.id } }).enabledCustomers();
  },
};
