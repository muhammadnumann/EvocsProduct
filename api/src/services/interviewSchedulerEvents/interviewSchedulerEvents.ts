import { Prisma, CalendarInviteStatus } from '@prisma/client';
import dayjs from 'dayjs';
import type {
  QueryResolvers,
  MutationResolvers,
  InterviewSchedulerEventRelationResolvers,
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
import { sanitizeEventAttendees } from 'src/utils/sanitizers';
import { today } from 'src/utils/utils';

export const interviewSchedulerEvents: QueryResolvers['interviewSchedulerEvents'] =
  ({ filter: { startDate, endDate, limit } }) => {
    requireAuth({});
    const userID = getCurrentUserID();

    return db.interviewSchedulerEvent.findMany({
      where: {
        userID,
        startTime: { gte: startDate ?? today() },
        endTime: { lte: endDate ?? dayjs().add(30, 'day').toDate() },
      },
      take: limit ?? undefined,
      orderBy: {
        startTime: 'asc',
      },
    });
  };

export const interviewSchedulerEvent: QueryResolvers['interviewSchedulerEvent'] =
  async ({ id }) => {
    requireAuth({});

    if (isEvocsUser() || hasRole(RoleList.JobServiceWorker)) {
      const a = db.interviewSchedulerEvent.findUnique({
        where: { id },
      });
      return a;
    }

    return db.interviewSchedulerEvent.findFirst({
      where: {
        id,
        userID: getCurrentUserID(),
      },
    });
  };

export const createInterviewSchedulerEvent: MutationResolvers['createInterviewSchedulerEvent'] =
  async ({ input }) => {
    requireAuth({});

    const userID =
      hasRole([RoleList.Admin]) && input.userID
        ? input.userID
        : getCurrentUserID();

    const { customerID } = await db.user.findUnique({ where: { id: userID } });
    const {
      userID: _uid,
      attendees,
      interviewStageID,
      candidateID,
      requisitionID,
      ...rest
    } = input;

    const data: Prisma.InterviewSchedulerEventCreateInput = {
      ...rest,
      InterviewStage: {
        connect: { id: interviewStageID },
      },
      user: {
        connect: { id: userID },
      },
      customer: { connect: { id: customerID } },
      requisition: {
        connect: { id: requisitionID },
      },
      CandidateRequisition: {
        connect: {
          candidateID_requisitionID: {
            candidateID: candidateID,
            requisitionID: requisitionID,
          },
        },
      },
      candidate: { connect: { id: input.candidateID } },
      attendees: {
        createMany: {
          data: sanitizeEventAttendees(input.calendarProvider, attendees),
        },
      },
    };

    return db.interviewSchedulerEvent.create({
      data,
    });
  };

export const updateInterviewSchedulerEvent: MutationResolvers['updateInterviewSchedulerEvent'] =
  async ({ id, input }) => {
    requireAuth({});
    const current = await db.interviewSchedulerEvent.findUnique({
      where: { id },
    });

    if (current.userID != getCurrentUserID() || !hasRole(RoleList.Admin)) {
      throw new ForbiddenError("You don't have access to do that.");
    }
    const { attendees: inputAttendees, ...data } = input;
    const attendees = sanitizeEventAttendees(
      input.calendarProvider,
      inputAttendees
    );

    return db.interviewSchedulerEvent.update({
      data: {
        ...data,
        attendees: {
          deleteMany: {
            eventID: id,
            id: {
              notIn: attendees.map((a) => a.id),
            },
          },
          upsert: attendees.map(({ id: _attendeeID, ...a }) => ({
            where: {
              eventID_email: {
                eventID: id,
                email: a.email,
              },
            },
            create: {
              attendeeURI: a.attendeeURI,
              name: a.name,
              email: a.email,
              inviteStatus: CalendarInviteStatus.PENDING,
              avatarURL: a.avatarURL,
            },
            update: {
              attendeeURI: a.attendeeURI,
              name: a.name,
              email: a.email,
              inviteStatus: hasRole([RoleList.Admin, RoleList.JobServiceWorker])
                ? a.inviteStatus
                : undefined,
              avatarURL: a.avatarURL,
            },
          })),
        },
      },
      where: { id },
    });
  };

export const deleteInterviewSchedulerEvent: MutationResolvers['deleteInterviewSchedulerEvent'] =
  async ({ id }) => {
    requireAuth({});
    const current = await db.interviewSchedulerEvent.findUnique({
      where: { id },
    });

    if (current.userID != getCurrentUserID() && !hasRole(RoleList.Admin)) {
      throw new ForbiddenError("You don't have access to do that.");
    }

    return db.interviewSchedulerEvent.delete({
      where: { id },
    });
  };

export const InterviewSchedulerEvent: InterviewSchedulerEventRelationResolvers =
  {
    CandidateRequisition: (_obj, { root }) => {
      return db.interviewSchedulerEvent
        .findUnique({ where: { id: root?.id } })
        .CandidateRequisition();
    },
    user: (_obj, { root }) => {
      requireAuth({});
      if (!isEvocsUser() && root.userID !== getCurrentUserID()) {
        throw new ForbiddenError("You don't have access to do that.");
      }
      return db.interviewSchedulerEvent
        .findUnique({ where: { id: root?.id } })
        .user();
    },
    customer: (_obj, { root }) => {
      requireAuth({ roles: [RoleList.Admin, RoleList.EvocsInternal] });
      return db.interviewSchedulerEvent
        .findUnique({ where: { id: root?.id } })
        .customer();
    },
    requisition: (_obj, { root }) => {
      return db.interviewSchedulerEvent
        .findUnique({ where: { id: root?.id } })
        .requisition();
    },
    candidate: (_obj, { root }) => {
      return db.interviewSchedulerEvent
        .findUnique({ where: { id: root?.id } })
        .candidate();
    },
    attendees: (_obj, { root }) => {
      requireAuth({});
      if (
        !hasRole([
          RoleList.Admin,
          RoleList.EvocsInternal,
          RoleList.JobServiceWorker,
        ]) ||
        root.userID !== getCurrentUserID()
      ) {
        throw new ForbiddenError("You don't have access to do that.");
      }
      return db.interviewSchedulerEventAttendee.findMany({
        where: {
          eventID: root?.id,
        },
      });
    },
  };
