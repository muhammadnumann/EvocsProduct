import type {
  QueryResolvers,
  ScheduleSelectionRelationResolvers,
} from 'types/graphql';

import { validate, validateWith } from '@redwoodjs/api';

import {
  getCurrentUserCustomerID,
  isEvocsUser,
  requireAuth,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

export const candidateScheduleSelections: QueryResolvers['candidateScheduleSelections'] =
  async ({ candidateScheduleID }) => {
    requireAuth({});

    const candidateSchedule = await db.candidateSchedule.findUnique({
      where: { id: candidateScheduleID },
      select: {
        CandidateRequisition: {
          select: {
            Candidate: {
              select: {
                owningCustomerID: true,
              },
            },
          },
        },
        scheduleSelections: true,
      },
    });

    validateWith(async () => {
      if (!isEvocsUser()) {
        validate(
          candidateSchedule?.CandidateRequisition?.Candidate?.owningCustomerID,
          {
            inclusion: {
              in: [getCurrentUserCustomerID()],
              message:
                'Please provide a valid candidate schedule selection input',
            },
          }
        );
      }
    });

    return candidateSchedule.scheduleSelections;
  };

export const ScheduleSelection: ScheduleSelectionRelationResolvers = {
  CandidateSchedules: (_obj, { root }) => {
    return db.scheduleSelection
      .findUnique({ where: { id: root?.id } })
      .CandidateSchedules();
  },
};
