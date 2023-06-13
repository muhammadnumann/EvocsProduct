import { ActivityPreservationReport } from '@buf/bufbuild_connect-web_evocs_commonschema/products/v1/defs_pb';

export type ActivityPreservationConfig = {
  customerID: number;
  enabledReports: ActivityPreservationReport[];
  tenantURLs: string[];
  customerSecretID: string;
  frequencyMinutes: number;
};
