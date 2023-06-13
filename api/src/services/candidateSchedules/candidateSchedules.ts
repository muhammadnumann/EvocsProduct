import {
  CandidateScheduleRequest,
  CandidateRequisition,
  Candidate,
  Requisition,
  CandidateSchedule as PrismaCandidateSchedule,
  ScheduleSelection,
} from '.prisma/client';
import type {
  QueryResolvers,
  MutationResolvers,
  CandidateScheduleRelationResolvers,
  PublicCandidateScheduleRelationResolvers,
} from 'types/graphql';

import { validate, validateWith } from '@redwoodjs/api';

import {
  getCurrentUserCustomerID,
  isEvocsUser,
  requireAuth,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

const validateUserCanViewCandidate = async (candidateID: number) => {
  if (!isEvocsUser()) {
    const candidate = await db.candidate.findUnique({
      where: { id: candidateID },
      select: { owningCustomerID: true },
    });

    validate(candidate?.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message: 'Please provide a valid candidate schedule input',
      },
    });
  }
};

const validateUserCanViewRequisition = async (requisitionID: number) => {
  if (!isEvocsUser()) {
    const requisition = await db.requisition.findUnique({
      where: { id: requisitionID },
      select: { owningCustomerID: true },
    });

    validate(requisition?.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message: 'Please provide a valid candidate schedule input',
      },
    });
  }
};

export const candidateSchedules: QueryResolvers['candidateSchedules'] =
  async () => {
    requireAuth({});
    return db.candidateSchedule.findMany({
      where: {
        CandidateRequisition: {
          Candidate: {
            owningCustomerID: getCurrentUserCustomerID(),
          },
        },
      },
    });
  };

export const oneCandidateSchedules: QueryResolvers['oneCandidateSchedules'] =
  async ({ candidateID }) => {
    requireAuth({});
    validateWith(async () => validateUserCanViewCandidate(candidateID));

    return db.candidateSchedule.findMany({
      where: {
        CandidateRequisition: {
          Candidate: {
            id: candidateID,
          },
        },
      },
    });
  };

export const candidateRequisitionSchedules: QueryResolvers['candidateRequisitionSchedules'] =
  async ({ candidateRequisitionID }) => {
    requireAuth({});

    const cr = await db.candidateRequisition.findUnique({
      where: {
        id: candidateRequisitionID,
      },
      include: {
        Candidate: {
          select: {
            owningCustomerID: true,
          },
        },
        Requisition: {
          select: {
            owningCustomerID: true,
          },
        },
      },
    });

    validate(cr?.Candidate.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message: 'Please provide a valid candidate requisition ID',
      },
    });
    validate(cr?.Requisition.owningCustomerID, {
      inclusion: {
        in: [getCurrentUserCustomerID()],
        message: 'Please provide a valid candidate requisition ID',
      },
    });

    return db.candidateRequisition
      .findUnique({
        where: { id: candidateRequisitionID },
      })
      .CandidateSchedules();
  };

export const candidateSchedule: QueryResolvers['candidateSchedule'] = async ({
  id,
}) => {
  requireAuth({});
  const dbSchedule = await db.candidateSchedule.findUnique({
    where: { id },
    include: {
      CandidateRequisition: {
        select: {
          candidateID: true,
        },
      },
    },
  });
  if (!dbSchedule) {
    return null;
  }

  validateWith(async () =>
    validateUserCanViewCandidate(dbSchedule?.CandidateRequisition?.candidateID)
  );
  const { CandidateRequisition: _, ...schedule } = dbSchedule;

  return schedule;
};

export const publicCandidateSchedule: QueryResolvers['publicCandidateSchedule'] =
  async ({ linkID }) => {
    const dbCandidateSchedule = await db.candidateScheduleRequest.findUnique({
      where: {
        linkID,
      },
      include: {
        CandidateRequisition: {
          include: {
            Candidate: true,
            Requisition: true,
          },
        },
        candidateSchedule: {
          include: {
            scheduleSelections: true,
          },
        },
      },
    });
    if (!dbCandidateSchedule) {
      return null;
    }

    return normalizePublicCandidateSchedule(dbCandidateSchedule);
  };

export const updatePublicCandidateSchedule: MutationResolvers['updatePublicCandidateSchedule'] =
  async ({ linkID, input }) => {
    validate(input?.scheduleSelections, 'Schedule selections', {
      presence: true,
    });

    const dbCandidateSchedule = await db.candidateScheduleRequest.update({
      where: {
        linkID,
      },
      data: {
        candidateSchedule: {
          update: {
            scheduleSelections: {
              deleteMany: {},
              create: input?.scheduleSelections,
            },
          },
        },
      },
      include: {
        CandidateRequisition: {
          include: {
            Candidate: true,
            Requisition: true,
          },
        },
        candidateSchedule: {
          include: {
            scheduleSelections: true,
          },
        },
      },
    });
    if (!dbCandidateSchedule) {
      return null;
    }

    return normalizePublicCandidateSchedule(dbCandidateSchedule);
  };

export const createCandidateSchedule: MutationResolvers['createCandidateSchedule'] =
  async ({ input: { candidateID, requisitionID, interviewStageID } }) => {
    requireAuth({});
    validateWith(async () => {
      validateUserCanViewCandidate(candidateID);
      validateUserCanViewRequisition(requisitionID);
    });

    return db.candidateSchedule.create({
      data: {
        CandidateRequisition: {
          connectOrCreate: {
            where: {
              candidateID_requisitionID: {
                candidateID,
                requisitionID,
              },
            },
            create: {
              candidateID,
              requisitionID,
              status: 'In Review',
            },
          },
        },
        InterviewStage: {
          connect: {
            id: interviewStageID,
          },
        },
      },
    });
  };

export const updateCandidateSchedule: MutationResolvers['updateCandidateSchedule'] =
  async ({ linkID, input }) => {
    validate(input.scheduleSelections, 'Schedule selections', {
      presence: { message: 'Schedule selections must be provided' },
      length: { min: 1 },
    });

    return db.candidateScheduleRequest.update({
      where: {
        linkID,
      },
      data: {
        candidateSchedule: {
          update: {
            scheduleSelections: {
              set: [],
              create: input.scheduleSelections,
            },
          },
        },
      },
    });
  };

export const PublicCandidateSchedule: PublicCandidateScheduleRelationResolvers =
  {
    scheduleSelections: (_obj, { root }) => {
      return db.candidateSchedule
        .findUnique({ where: { id: root?.id } })
        .scheduleSelections();
    },
  };

export const CandidateSchedule: CandidateScheduleRelationResolvers = {
  scheduleSelections: (_obj, { root }) => {
    return db.candidateSchedule
      .findUnique({ where: { id: root?.id } })
      .scheduleSelections();
  },
  scheduleRequests: (_obj, { root }) => {
    return db.candidateSchedule
      .findUnique({ where: { id: root?.id } })
      .scheduleRequests();
  },
  Candidate: (_obj, { root }) => {
    return db.candidateRequisition
      .findUnique({ where: { id: root?.candidateRequisitionID } })
      .Candidate();
  },
  Requsition: (_obj, { root }) => {
    return db.candidateRequisition
      .findUnique({ where: { id: root?.candidateRequisitionID } })
      .Requisition();
  },
  CandidateRequisition: (_obj, { root }) => {
    return db.candidateSchedule
      .findUnique({
        where: { id: root?.id },
      })
      .CandidateRequisition();
  },
};

type PublicResponseBody = CandidateScheduleRequest & {
  CandidateRequisition: CandidateRequisition & {
    Candidate: Candidate;
    Requisition: Requisition;
  };
  candidateSchedule: PrismaCandidateSchedule & {
    scheduleSelections: ScheduleSelection[];
  };
};

const normalizePublicCandidateSchedule = (input: PublicResponseBody) => {
  const {
    startTime,
    endTime,
    CandidateRequisition: { Candidate: c, Requisition: r },
    candidateSchedule: { id, scheduleSelections },
  } = input;

  return {
    id,
    firstName: c.firstName,
    lastName: c.lastName,
    title: r.title,
    status: r.status,
    scheduleSelections,
    positionType: r.positionType,
    startTime,
    endTime,
  };
};
