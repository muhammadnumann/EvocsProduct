import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getSignedSchedulerUploadURL = async (
  key: string
): Promise<string> => {
  const client = getSchedulerS3Client();
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_SCHEDULER_ATTACHMENT_BUCKET,
    Key: key,
    ContentType: 'application/octet-stream',
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
};

export const getSignedSchedulerDownloadURL = async (
  key: string
): Promise<string> => {
  const client = getSchedulerS3Client();
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_SCHEDULER_ATTACHMENT_BUCKET,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
};

const getSchedulerS3Client = (): S3Client => {
  return new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_SCHEDULER_ATTACHMENT_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SCHEDULER_ATTACHMENT_SECRET_KEY,
    },
    region: 'us-west-2',
  });
};
