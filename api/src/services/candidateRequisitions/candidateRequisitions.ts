import type {
  QueryResolvers,
  MutationResolvers,
  CandidateRequisitionRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const candidateRequisitions: QueryResolvers['candidateRequisitions'] =
  () => {
    return db.candidateRequisition.findMany();
  };

export const candidateRequisition: QueryResolvers['candidateRequisition'] = ({
  id,
}) => {
  return db.candidateRequisition.findUnique({
    where: { id },
  });
};

export const createCandidateRequisition: MutationResolvers['createCandidateRequisition'] =
  ({ input }) => {
    return db.candidateRequisition.create({
      data: input,
    });
  };

export const updateCandidateRequisition: MutationResolvers['updateCandidateRequisition'] =
  ({ id, input }) => {
    return db.candidateRequisition.update({
      data: input,
      where: { id },
    });
  };

export const deleteCandidateRequisition: MutationResolvers['deleteCandidateRequisition'] =
  ({ id }) => {
    return db.candidateRequisition.delete({
      where: { id },
    });
  };

export const CandidateRequisition: CandidateRequisitionRelationResolvers = {
  Candidate: (_obj, { root }) => {
    return db.candidateRequisition
      .findUnique({ where: { id: root?.id } })
      .Candidate();
  },
  Notes: (_obj, { root }) => {
    return db.candidateRequisition
      .findUnique({ where: { id: root?.id } })
      .Notes();
  },
  Requisition: (_obj, { root }) => {
    return db.candidateRequisition
      .findUnique({ where: { id: root?.id } })
      .Requisition();
  },
  CandidateSchedules: (_obj, { root }) => {
    return db.candidateRequisition
      .findUnique({ where: { id: root?.id } })
      .CandidateSchedules();
  },
};
