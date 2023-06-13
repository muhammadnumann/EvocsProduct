import type {
  QueryResolvers,
  MutationResolvers,
  InterviewStageRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const interviewStages: QueryResolvers['interviewStages'] = () => {
  return db.interviewStage.findMany();
};

export const interviewStage: QueryResolvers['interviewStage'] = ({ id }) => {
  return db.interviewStage.findUnique({
    where: { id },
  });
};

export const createInterviewStage: MutationResolvers['createInterviewStage'] =
  ({ input }) => {
    return db.interviewStage.create({
      data: input,
    });
  };

export const updateInterviewStage: MutationResolvers['updateInterviewStage'] =
  ({ id, input }) => {
    return db.interviewStage.update({
      data: input,
      where: { id },
    });
  };

export const deleteInterviewStage: MutationResolvers['deleteInterviewStage'] =
  ({ id }) => {
    return db.interviewStage.delete({
      where: { id },
    });
  };

export const InterviewStage: InterviewStageRelationResolvers = {
  Requisition: (_obj, { root }) => {
    return db.interviewStage
      .findUnique({ where: { id: root?.id } })
      .Requisition();
  },
  InterviewSchedulerEvents: (_obj, { root }) => {
    return db.interviewStage
      .findUnique({ where: { id: root?.id } })
      .InterviewSchedulerEvents();
  },
  CandidateScheduleRequests: (_obj, { root }) => {
    return db.interviewStage
      .findUnique({ where: { id: root?.id } })
      .CandidateScheduleRequests();
  },
  CandidateSchedules: (_obj, { root }) => {
    return db.interviewStage
      .findUnique({ where: { id: root?.id } })
      .CandidateSchedules();
  },
};
