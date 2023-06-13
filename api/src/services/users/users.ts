import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql';

import { validate, validateWith } from '@redwoodjs/api';
import { AuthenticationError } from '@redwoodjs/graphql-server';

import {
  getCurrentUserID,
  hasRole,
  isEvocsUser,
  requireAuth,
  RoleList,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

export const users: QueryResolvers['users'] = async () => {
  requireAuth({
    roles: [RoleList.CustomerAdmin, RoleList.EvocsInternal, RoleList.Admin],
  });

  if (isEvocsUser()) {
    return db.user.findMany();
  }

  const { customerID } = await db.user.findUnique({
    where: { id: getCurrentUserID() },
  });

  return db.user.findMany({ where: { customerID } });
};

export const user: QueryResolvers['user'] = async ({ id }) => {
  requireAuth({});

  if (isEvocsUser()) {
    return db.user.findUnique({
      where: { id },
    });
  }

  validateWith(async () => {
    if (!hasRole([RoleList.CustomerAdmin])) {
      const userID = getCurrentUserID();
      validate(id, 'ID', { acceptance: { in: [userID] } });
    }
  });

  const userID = getCurrentUserID();
  if (hasRole([RoleList.CustomerAdmin])) {
    const { customerID } = await db.user.findUnique({ where: { id: userID } });
    return db.user.findFirst({
      where: { id, customerID },
    });
  }

  return db.user.findUnique({ where: { id } });
};

export const createUser: MutationResolvers['createUser'] = async ({
  input,
}) => {
  requireAuth({
    roles: [RoleList.CustomerAdmin, RoleList.EvocsInternal, RoleList.Admin],
  });

  if (!isEvocsUser()) {
    const userID = getCurrentUserID();
    const { customerID } = await db.user.findUnique({
      where: { id: userID },
    });

    if (input.customerID !== customerID) {
      throw new AuthenticationError("You don't have permission to do that.");
    }
  }

  return db.user.create({
    data: input,
  });
};

export const updateUser: MutationResolvers['updateUser'] = async ({
  id,
  input,
}) => {
  validateWith(async () => {
    if (!isEvocsUser()) {
      validate(input.auth0ID, 'Auth ID', { absence: true });
      validate(input.customerID, 'Customer ID', { absence: true });
    }

    if (hasRole(RoleList.CustomerAdmin)) {
      const userID = getCurrentUserID();
      const { customerID } = await db.user.findUnique({
        where: { id: userID },
      });
      const { customerID: updateUserCustomerID } = await db.user.findUnique({
        where: { id },
      });

      if (customerID !== updateUserCustomerID) {
        throw new AuthenticationError("You don't have permission to do that.");
      }
    }
  });

  return db.user.update({
    data: input,
    where: { id },
  });
};

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.user.delete({
    where: { id },
  });
};

export const User: UserRelationResolvers = {
  customer: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root?.id } }).customer(),
  jobs: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root?.id } }).jobs(),
  Notes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Notes();
  },
  Attachments: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Attachments();
  },
};
