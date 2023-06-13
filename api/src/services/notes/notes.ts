import type {
  QueryResolvers,
  MutationResolvers,
  NoteRelationResolvers,
} from 'types/graphql';

import { validate } from '@redwoodjs/api';

import {
  getCurrentUserCustomerID,
  getCurrentUserID,
  isEvocsUser,
  requireAuth,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

const message = 'Please provide a valid candidate requisition ID';
const validateUserCanViewCandidateRequisition = async (
  candidateRequisitionID: number
) => {
  if (!isEvocsUser()) {
    const cr = await db.candidateRequisition.findUnique({
      where: {
        id: candidateRequisitionID,
      },
      select: {
        Requisition: {
          select: {
            owningCustomerID: true,
          },
        },
      },
    });

    validate(cr?.Requisition?.owningCustomerID, {
      inclusion: { in: [getCurrentUserCustomerID()], message },
    });
  }
};

export const notes: QueryResolvers['notes'] = async ({
  candidateRequisitionID,
}) => {
  requireAuth({});
  await validateUserCanViewCandidateRequisition(candidateRequisitionID);
  return db.candidateRequisition
    .findUnique({
      where: { id: candidateRequisitionID },
    })
    .Notes();
};

export const note: QueryResolvers['note'] = async ({ id }) => {
  requireAuth({});
  const dbNote = await db.note.findUnique({
    where: { id },
    include: { CandidateRequsitions: { select: { id: true } } },
  });
  const { CandidateRequsitions, ...n } = dbNote;
  validate(CandidateRequsitions.length, {
    length: {
      equal: 1,
      message,
    },
  });
  await validateUserCanViewCandidateRequisition(CandidateRequsitions[0].id);

  return n;
};

export const createNote: MutationResolvers['createNote'] = async ({
  input,
}) => {
  requireAuth({});
  await validateUserCanViewCandidateRequisition(input?.candidateRequisitionID);

  return db.note.create({
    data: {
      content: input.content,
      CandidateRequsitions: {
        connect: {
          id: input.candidateRequisitionID,
        },
      },
      addedByUserID: getCurrentUserID(),
    },
  });
};

export const updateNote: MutationResolvers['updateNote'] = async ({
  id,
  input,
}) => {
  requireAuth({});
  const dbNote = await db.note.findUnique({
    where: { id },
  });
  validate(dbNote?.addedByUserID, {
    numericality: {
      equal: getCurrentUserID(),
      message,
    },
  });

  return db.note.update({
    data: input,
    where: { id },
  });
};

export const deleteNote: MutationResolvers['deleteNote'] = async ({ id }) => {
  requireAuth({});
  const dbNote = await db.note.findUnique({
    where: { id },
  });
  validate(dbNote?.addedByUserID, {
    numericality: {
      equal: getCurrentUserID(),
      message,
    },
  });

  return db.note.delete({ where: { id } });
};

export const Note: NoteRelationResolvers = {
  Candidate: (_obj, { root }) => {
    return db.note
      .findUnique({ where: { id: root?.id } })
      .Candidate()
      .then(firstOrNull);
  },
  CandidateRequsitions: (_obj, { root }) => {
    return db.note
      .findUnique({ where: { id: root?.id } })
      .CandidateRequsitions()
      .then(firstOrNull);
  },
  User: (_obj, { root }) => {
    return db.note.findUnique({ where: { id: root?.id } }).User();
  },
};

const firstOrNull = <T>(arr: T[]): T | null => {
  if (arr != null && arr.length > 0) {
    return arr[0];
  }
  return null;
};
