import type {
  QueryResolvers,
  MutationResolvers,
  InterviewSchedulerEventAttendeeRelationResolvers,
} from 'types/graphql';

import { ForbiddenError } from '@redwoodjs/graphql-server';

import {
  getCurrentUserID,
  hasRole,
  isEvocsUser,
  requireAuth,
  RoleList,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

export const interviewSchedulerEventAttendees: QueryResolvers['interviewSchedulerEventAttendees'] =
  () => {
    requireAuth({ roles: [RoleList.JobServiceWorker, RoleList.Admin] });
    return db.interviewSchedulerEventAttendee.findMany({});
  };

export const interviewSchedulerEventAttendee: QueryResolvers['interviewSchedulerEventAttendee'] =
  ({ id }) => {
    requireAuth({ roles: [RoleList.JobServiceWorker, RoleList.Admin] });
    return db.interviewSchedulerEventAttendee.findUnique({
      where: { id },
    });
  };

export const interviewSchedulerEventAttendeesForEvent: QueryResolvers['interviewSchedulerEventAttendeesForEvent'] =
  ({ eventID }) => {
    requireAuth({});
    return db.interviewSchedulerEventAttendee.findMany({
      where: {
        interviewSchedulerEvent: {
          id: eventID,
          userID: !isEvocsUser() ? getCurrentUserID() : undefined,
        },
      },
    });
  };

// export const createInterviewSchedulerEventAttendee: MutationResolvers['createInterviewSchedulerEventAttendee'] =
//   async ({ input }) => {
//     requireAuth({});
//     if (!isEvocsUser()) {
//       const { userID } = await db.interviewSchedulerEvent.findUnique({
//         where: {
//           id: input.eventID,
//         },
//       });
//       if (userID !== getCurrentUserID()) {
//         throw new ForbiddenError("You don't have access to do that.");
//       }
//     }

//     return db.interviewSchedulerEventAttendee.create({
//       data: input,
//     });
//   };

export const updateInterviewSchedulerEventAttendee: MutationResolvers['updateInterviewSchedulerEventAttendee'] =
  ({ id, input }) => {
    requireAuth({});
    const canUpdateStatus = hasRole([
      RoleList.JobServiceWorker,
      RoleList.Admin,
    ]);
    const { inviteStatus, ...data } = input;

    return db.interviewSchedulerEventAttendee.update({
      data: {
        ...data,
        inviteStatus: canUpdateStatus ? inviteStatus : undefined,
      },
      where: { id },
    });
  };

export const deleteInterviewSchedulerEventAttendee: MutationResolvers['deleteInterviewSchedulerEventAttendee'] =
  async ({ id }) => {
    requireAuth({});
    if (isEvocsUser()) {
      return db.interviewSchedulerEventAttendee.delete({
        where: {
          id,
        },
      });
    }

    const {
      interviewSchedulerEvent: { userID: eventOwnerUserID },
    } = await db.interviewSchedulerEventAttendee.findUnique({
      where: { id },
      select: {
        interviewSchedulerEvent: {
          select: {
            userID: true,
          },
        },
      },
    });

    if (eventOwnerUserID !== getCurrentUserID()) {
      throw new ForbiddenError("You don't have access to do that.");
    }

    return db.interviewSchedulerEventAttendee.delete({
      where: {
        id,
      },
    });
  };

export const InterviewSchedulerEventAttendee: InterviewSchedulerEventAttendeeRelationResolvers =
  {
    interviewSchedulerEvent: (_obj, { root }) => {
      requireAuth({ roles: [RoleList.JobServiceWorker, RoleList.Admin] });
      return db.interviewSchedulerEventAttendee
        .findUnique({
          where: {
            id: root?.id,
          },
        })
        .interviewSchedulerEvent();
    },
  };
