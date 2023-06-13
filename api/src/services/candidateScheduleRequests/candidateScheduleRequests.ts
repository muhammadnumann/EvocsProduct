import type {
  QueryResolvers,
  MutationResolvers,
  CandidateScheduleRequestRelationResolvers,
} from 'types/graphql';

import { validate, validateWith } from '@redwoodjs/api';

import {
  getCurrentUserCustomerID,
  getCurrentUserID,
  isEvocsUser,
  requireAuth,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

const validateUserCanViewCandidate = async (candidateID: number) => {
  if (!isEvocsUser()) {
    const candidate = await db.candidate.findUnique({
      where: {
        id: candidateID,
      },
      select: {
        owningCustomerID: true,
      },
    });
    validate(candidate?.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message: 'Please provide a valid candidate schedule ID',
      },
    });
  }
};

const validateUserCanViewRequisition = async (requisitionID: number) => {
  if (!isEvocsUser()) {
    const requisition = await db.requisition.findUnique({
      where: { id: requisitionID },
      select: {
        owningCustomerID: true,
      },
    });
    validate(requisition?.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message: 'Please provide a valid candidate schedule ID',
      },
    });
  }
};

export const candidateScheduleRequest: QueryResolvers['candidateScheduleRequest'] =
  async ({ id }) => {
    requireAuth({});

    const scheduleRequest = await db.candidateScheduleRequest.findUnique({
      where: { id },
    });
    validateWith(async () =>
      validateUserCanViewCandidate(scheduleRequest.candidateID)
    );

    return scheduleRequest;
  };

export const createCandidateScheduleRequest: MutationResolvers['createCandidateScheduleRequest'] =
  async ({ input }) => {
    requireAuth({});

    validateWith(async () => validateUserCanViewCandidate(input?.candidateID));
    validateWith(async () =>
      validateUserCanViewRequisition(input?.requisitionID)
    );
    validate(new Date(input?.endTime).getTime(), {
      numericality: {
        lessThan: new Date(input?.endTime).getTime(),
        message: 'Start time must be before end time',
      },
    });

    const candidateRequisition = await db.candidateRequisition.findUnique({
      where: {
        candidateID_requisitionID: {
          candidateID: input?.candidateID,
          requisitionID: input?.requisitionID,
        },
      },
      select: {
        id: true,
      },
    });

    return db.candidateScheduleRequest.create({
      data: {
        ...input,
        candidateRequisitionID: candidateRequisition?.id,
        initiatingUserID: getCurrentUserID(),
        emailServiceMessageID: 'todoSendEmail',
      },
    });
  };

export const updateCandidateScheduleRequest: MutationResolvers['updateCandidateScheduleRequest'] =
  ({ id, input }) => {
    requireAuth({});

    return db.candidateScheduleRequest.update({
      data: input,
      where: { id },
    });
  };

export const CandidateScheduleRequest: CandidateScheduleRequestRelationResolvers =
  {
    initiatingUser: (_obj, { root }) => {
      return db.candidateScheduleRequest
        .findUnique({ where: { id: root?.id } })
        .initiatingUser();
    },
    candidate: (_obj, { root }) => {
      return db.candidateScheduleRequest
        .findUnique({ where: { id: root?.id } })
        .candidate();
    },
    candidateSchedule: (_obj, { root }) => {
      return db.candidateScheduleRequest
        .findUnique({ where: { id: root?.id } })
        .candidateSchedule();
    },
    reminders: (_obj, { root }) => {
      return db.candidateScheduleRequest
        .findUnique({ where: { id: root?.id } })
        .reminders();
    },
  };
