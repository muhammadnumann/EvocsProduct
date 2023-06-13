import { ConfidentialClientApplication } from '@azure/msal-node';

export type MSALState = {
  userID: number;
};

export const schedulerMSALInstance = (): ConfidentialClientApplication =>
  new ConfidentialClientApplication({
    auth: {
      clientId: process.env.AZURE_AD_SCHEDULER_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_SCHEDULER_CLIENT_SECRET,
      authority: `https://login.microsoftonline.com/${process.env.OFFICE_365_SCHEDULER_DEV_TENANT_ID}`,
    },
  });

export const extractMSALRefreshToken = (
  msalInstance: ConfidentialClientApplication
): string => {
  const tokenCache = JSON.parse(msalInstance.getTokenCache().serialize());
  const { RefreshToken: refreshTokenObject } = tokenCache;
  return refreshTokenObject[Object.keys(refreshTokenObject)[0]].secret;
};

export const InterviewSchedulerScopes: readonly string[] = [
  'Calendars.ReadWrite',
  'Calendars.Read.Shared',
  'User.Read',
  'User.Read.All',
  'People.Read',
  'People.Read.All',
];
