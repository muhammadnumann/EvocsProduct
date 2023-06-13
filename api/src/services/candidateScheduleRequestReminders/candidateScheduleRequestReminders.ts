import type {
  QueryResolvers,
  MutationResolvers,
  CandidateScheduleRequestReminderRelationResolvers,
} from 'types/graphql';

import { validate, validateWith } from '@redwoodjs/api';

import {
  getCurrentUserCustomerID,
  isEvocsUser,
  requireAuth,
  RoleList,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

const message = 'Please provide a valid candidate schedule request ID';

const validateUserCanViewRequest = async (
  candidateScheduleRequestID: number
) => {
  if (!isEvocsUser()) {
    const {
      candidate: { owningCustomerID },
    } = await db.candidateScheduleRequest.findUnique({
      where: {
        id: candidateScheduleRequestID,
      },
      select: {
        candidate: {
          select: {
            owningCustomerID: true,
          },
        },
      },
    });

    validate(owningCustomerID, {
      inclusion: { in: [getCurrentUserCustomerID()], message },
    });
  }
};

export const candidateScheduleRequestReminders: QueryResolvers['candidateScheduleRequestReminders'] =
  async ({ candidateScheduleRequestID }) => {
    requireAuth({});

    validateWith(async () =>
      validateUserCanViewRequest(candidateScheduleRequestID)
    );

    return db.candidateScheduleRequestReminder.findMany({
      where: {
        candidateScheduleRequestID,
      },
    });
  };

export const candidateScheduleRequestReminder: QueryResolvers['candidateScheduleRequestReminder'] =
  async ({ id }) => {
    const reminder = await db.candidateScheduleRequestReminder.findUnique({
      where: { id },
    });

    validateWith(async () =>
      validateUserCanViewRequest(reminder.candidateScheduleRequestID)
    );

    return reminder;
  };

export const createCandidateScheduleRequestReminder: MutationResolvers['createCandidateScheduleRequestReminder'] =
  ({ input }) => {
    requireAuth({});
    validateWith(async () =>
      validateUserCanViewRequest(input.candidateScheduleRequestID)
    );

    // todo add actual email sending
    return db.candidateScheduleRequestReminder.create({
      data: { ...input, emailServiceMessageID: 'todoreplace' },
    });
  };

export const updateCandidateScheduleRequestReminder: MutationResolvers['updateCandidateScheduleRequestReminder'] =
  ({ id, input }) => {
    requireAuth({ roles: RoleList.JobServiceWorker });

    return db.candidateScheduleRequestReminder.update({
      data: input,
      where: { id },
    });
  };

export const CandidateScheduleRequestReminder: CandidateScheduleRequestReminderRelationResolvers =
  {
    candidateScheduleRequest: (_obj, { root }) => {
      return db.candidateScheduleRequestReminder
        .findUnique({ where: { id: root?.id } })
        .candidateScheduleRequest();
    },
  };
