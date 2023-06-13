import type {
  QueryResolvers,
  MutationResolvers,
  AttachmentRelationResolvers,
} from 'types/graphql';
import { v4 as uuidv4 } from 'uuid';

import { validate } from '@redwoodjs/api';

import {
  getCurrentUserCustomerID,
  getCurrentUserID,
  requireAuth,
} from 'src/lib/auth';
import { db } from 'src/lib/db';
import {
  getSignedSchedulerDownloadURL,
  getSignedSchedulerUploadURL,
} from 'src/lib/s3';

const message = 'Please provide a valid attachment ID';

export const getPresignedUploadURL: QueryResolvers['getPresignedUploadURL'] =
  async ({ title }) => {
    const key = `attachments/${getCurrentUserCustomerID()}/${uuidv4()}_${title}`;
    const url = await getSignedSchedulerUploadURL(key);

    return {
      key,
      url,
    };
  };

export const attachment: QueryResolvers['attachment'] = async ({ id }) => {
  requireAuth({});
  const dbAttachment = await db.attachment.findUnique({
    where: { id },
  });

  validate(dbAttachment?.owningCustomerID, {
    numericality: {
      equal: getCurrentUserCustomerID(),
      message,
    },
  });

  const url = await getSignedSchedulerDownloadURL(dbAttachment.key);

  return { ...dbAttachment, url };
};

export const createAttachment: MutationResolvers['createAttachment'] = ({
  input,
}) => {
  requireAuth({});
  return db.attachment.create({
    data: {
      ...input,
      uploadedByUserID: getCurrentUserID(),
      owningCustomerID: getCurrentUserCustomerID(),
    },
  });
};

export const deleteAttachment: MutationResolvers['deleteAttachment'] = async ({
  id,
}) => {
  requireAuth({});

  return await db.$transaction(async (tx) => {
    const dbAttachment = await tx.attachment.delete({
      where: { id },
    });

    validate(dbAttachment?.uploadedByUserID, {
      numericality: {
        equal: getCurrentUserID(),
        message,
      },
    });

    return dbAttachment;
  });
};

export const Attachment: AttachmentRelationResolvers = {
  Candidates: (_obj, { root }) => {
    return db.attachment.findUnique({ where: { id: root?.id } }).Candidates();
  },
  Customer: (_obj, { root }) => {
    return db.attachment
      .findUnique({ where: { id: root?.id } })
      .OwningCustomer();
  },
  Requisitions: (_obj, { root }) => {
    return db.attachment.findUnique({ where: { id: root?.id } }).Requisitions();
  },
  User: (_obj, { root }) => {
    return db.attachment.findUnique({ where: { id: root?.id } }).UploadedBy();
  },
};
