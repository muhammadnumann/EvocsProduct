import type {
  QueryResolvers,
  MutationResolvers,
  CandidateRelationResolvers,
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

const message = 'Please provide a valid candidate ID';

export const candidates: QueryResolvers['candidates'] = async ({ filter }) => {
  requireAuth({});

  return db.candidate.findMany({
    where: {
      addedByUserID: filter?.createdByUserOnly ? getCurrentUserID() : undefined,
      owningCustomerID: getCurrentUserCustomerID(),
    },
    take: filter?.limit ?? 10,
    skip: filter?.skip,
  });
};

export const candidate: QueryResolvers['candidate'] = async ({ id }) => {
  requireAuth({});

  const candidate = await db.candidate.findUnique({
    where: { id },
  });

  if (!isEvocsUser()) {
    validate(candidate?.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message,
      },
    });
  }

  return candidate;
};

export const createCandidate: MutationResolvers['createCandidate'] = async ({
  input,
}) => {
  requireAuth({});

  return db.candidate.create({
    data: {
      ...input,
      addedByUserID: getCurrentUserID(),
      owningCustomerID: getCurrentUserCustomerID(),
    },
  });
};

export const updateCandidate: MutationResolvers['updateCandidate'] = async ({
  id,
  input,
}) => {
  requireAuth({});

  validateWith(async () => {
    if (!isEvocsUser()) {
      const candidate = await db.candidate.findUnique({
        where: {
          id,
        },
      });
      if (hasRole(RoleList.CustomerAdmin)) {
        validate(candidate?.owningCustomerID, {
          inclusion: {
            in: [getCurrentUserCustomerID()],
            message,
          },
        });
      }

      validate(candidate?.addedByUserID, {
        inclusion: {
          in: [getCurrentUserID()],
          message,
        },
      });
    }
  });

  return db.candidate.update({
    data: input,
    where: { id },
  });
};

export const deleteCandidate: MutationResolvers['deleteCandidate'] = async ({
  id,
}) => {
  requireAuth({});

  validateWith(async () => {
    if (hasRole(RoleList.Admin)) {
      return;
    }

    const candidate = await db.candidate.findUnique({
      where: {
        id,
      },
    });

    if (hasRole(RoleList.CustomerAdmin)) {
      validate(candidate?.owningCustomerID, {
        inclusion: {
          in: [getCurrentUserCustomerID()],
          message,
        },
      });
    }

    validate(candidate?.addedByUserID, {
      inclusion: {
        in: [getCurrentUserID()],
        message,
      },
    });
  });

  return db.candidate.delete({
    where: { id },
  });
};

export const Candidate: CandidateRelationResolvers = {
  Attachments: (_obj, { root }) => {
    return db.candidate.findUnique({ where: { id: root?.id } }).Attachments();
  },
  Notes: (_obj, { root }) => {
    return db.candidate.findUnique({ where: { id: root?.id } }).Notes();
  },
  customer: (_obj, { root }) => {
    return db.candidate.findUnique({ where: { id: root?.id } }).customer();
  },
  user: (_obj, { root }) => {
    return db.candidate.findUnique({ where: { id: root?.id } }).user();
  },
  candidateSchedules: (_obj, { root }) => {
    return db.candidate
      .findUnique({
        where: {
          id: root?.id,
        },
      })
      .CandidateRequisitions({
        select: {
          CandidateSchedules: true,
        },
      })
      .then((cr) => cr.flatMap(({ CandidateSchedules }) => CandidateSchedules));
  },
  candidateScheduleRequests: (_obj, { root }) => {
    return db.candidate
      .findUnique({ where: { id: root?.id } })
      .candidateScheduleRequests();
  },
  requsitions: (_obj, { root }) => {
    return db.candidate
      .findUnique({ where: { id: root?.id } })
      .CandidateRequisitions({
        select: {
          Requisition: true,
        },
      })
      .then((r) => r.map(({ Requisition: req }) => ({ ...req })));
  },
  name: (_obj, { root: { firstName, lastName, preferredName } }) =>
    `${preferredName ?? firstName} ${lastName}`,
};
