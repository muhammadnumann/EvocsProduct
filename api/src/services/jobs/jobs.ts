import type {
  QueryResolvers,
  MutationResolvers,
  JobRelationResolvers,
} from 'types/graphql';

import {
  getCurrentUserID,
  isEvocsUser,
  requireAuth,
  RoleList,
} from 'src/lib/auth';
import { db } from 'src/lib/db';

export const jobs: QueryResolvers['jobs'] = () => {
  if (isEvocsUser()) {
    return db.job.findMany();
  }

  const userID = getCurrentUserID();
  return db.job.findMany({ where: { initiatingUserID: userID } });
};

export const job: QueryResolvers['job'] = ({ id }) => {
  if (isEvocsUser()) {
    return db.job.findUnique({ where: { id } });
  }

  const userID = getCurrentUserID();
  return db.job.findFirst({
    where: { id, initiatingUserID: userID },
  });
};

export const createJob: MutationResolvers['createJob'] = ({ input }) => {
  requireAuth({});
  input.resultBlob = input.resultBlob ?? undefined;
  return db.job.create({
    data: input,
  });
};

export const updateJob: MutationResolvers['updateJob'] = ({ id, input }) => {
  requireAuth({ roles: [RoleList.JobServiceWorker, RoleList.Admin] });
  input.resultBlob = input.resultBlob ?? undefined;
  return db.job.update({
    data: input,
    where: { id },
  });
};

export const deleteJob: MutationResolvers['deleteJob'] = ({ id }) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.job.delete({
    where: { id },
  });
};

export const Job: JobRelationResolvers = {
  user: (_obj, { root }) =>
    db.job.findUnique({ where: { id: root.id } }).user(),
};
