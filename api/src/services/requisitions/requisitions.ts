import type {
  QueryResolvers,
  MutationResolvers,
  RequisitionRelationResolvers,
} from 'types/graphql';

import { validate, validateWith } from '@redwoodjs/api';

import {
  getCurrentUserCustomerID,
  getCurrentUserID,
  hasRole,
  isEvocsUser,
  requireAuth,
  RoleList,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

const message = 'Please provide a valid requisition input';

const validateUserHasReqWritePerms = async (requisitionID: number) => {
  if (!isEvocsUser()) {
    const req = await db.requisition.findUnique({
      where: { id: requisitionID },
    });
    if (hasRole(RoleList.CustomerAdmin)) {
      validate(req?.owningCustomerID, {
        inclusion: {
          in: [getCurrentUserCustomerID()],
          message,
        },
      });
    } else {
      validate(req?.owningUserID, {
        inclusion: {
          in: [getCurrentUserID()],
          message,
        },
      });
    }
  }
};

export const requisitions: QueryResolvers['requisitions'] = ({ filter }) => {
  requireAuth({});

  if (filter?.createdByUserOnly) {
    return db.user
      .findUnique({ where: { id: getCurrentUserID() } })
      .Requisitions({
        take: filter?.limit ?? 10,
        skip: filter?.skip ?? undefined,
      });
  }

  return db.customer
    .findUnique({ where: { id: getCurrentUserCustomerID() } })
    .Requisitions({
      take: filter?.limit ?? 10,
      skip: filter?.skip ?? undefined,
    });
};

export const requisition: QueryResolvers['requisition'] = async ({ id }) => {
  requireAuth({});

  const req = await db.requisition.findUnique({
    where: { id },
  });
  if (!isEvocsUser()) {
    validate(req?.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message,
      },
    });
  }

  return req;
};

export const createRequisition: MutationResolvers['createRequisition'] = ({
  input,
}) => {
  requireAuth({});

  return db.requisition.create({
    data: {
      ...input,
      owningUserID: getCurrentUserID(),
      owningCustomerID: getCurrentUserCustomerID(),
      status: 'todo pending',
    },
  });
};

export const updateRequisition: MutationResolvers['updateRequisition'] =
  async ({ id, input }) => {
    requireAuth({});
    validateWith(async () => validateUserHasReqWritePerms(id));

    return db.requisition.update({
      data: input,
      where: { id },
    });
  };

export const deleteRequisition: MutationResolvers['deleteRequisition'] =
  async ({ id }) => {
    requireAuth({});
    validateWith(async () => validateUserHasReqWritePerms(id));

    return db.requisition.delete({
      where: { id },
    });
  };

export const Requisition: RequisitionRelationResolvers = {
  Attachments: (_obj, { root }) => {
    return db.requisition.findUnique({ where: { id: root?.id } }).Attachments();
  },
  Candidates: (_obj, { root }) => {
    return db.requisition
      .findUnique({ where: { id: root?.id } })
      .CandidateRequisitions({
        select: {
          Candidate: true,
        },
      })
      .then((candidates) => candidates.map(({ Candidate: c }) => ({ ...c })));
  },
  CandidateRequisitions: (_obj, { root }) => {
    return db.requisition
      .findUnique({ where: { id: root?.id } })
      .CandidateRequisitions();
  },
  Customer: (_obj, { root }) => {
    return db.requisition.findUnique({ where: { id: root?.id } }).Customer();
  },
  User: (_obj, { root }) => {
    return db.requisition.findUnique({ where: { id: root?.id } }).User();
  },
};
