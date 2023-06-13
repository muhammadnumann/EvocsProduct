import { createContext, ReactNode } from 'react';

import type {
  FindInterviewSchedulerEventsLayoutQuery,
  FindInterviewSchedulerEventsLayoutQueryVariables,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query FindInterviewSchedulerEventsLayoutQuery {
    requiredOAuthByProductTitle(title: "Interview Scheduler") {
      adFS
      adLDAP
      azureAD
      google
      ping
    }
    configuredOAuthByProductTitle(title: "Interview Scheduler") {
      adFS
      adLDAP
      azureAD
      google
      ping
    }
    productByTitle(title: "Interview Scheduler") {
      id
    }
  }
`;

const allAuthFalse = {
  adFS: false,
  adLDAP: false,
  azureAD: false,
  google: false,
  ping: false,
  zoom: false,
};

type InterviewSchedulerContextProps = {
  allAuthConfigured: boolean;
  requiredOauth: FindInterviewSchedulerEventsLayoutQuery['requiredOAuthByProductTitle'];
  configuredOauth: FindInterviewSchedulerEventsLayoutQuery['configuredOAuthByProductTitle'];
  productID: number;
};
export const InterviewSchedulerContext =
  createContext<InterviewSchedulerContextProps>({
    allAuthConfigured: false,
    requiredOauth: { ...allAuthFalse },
    configuredOauth: { ...allAuthFalse },
    productID: 1,
  });

const allRequiredConfigured = ({
  requiredOauth,
  configuredOauth,
}: Omit<InterviewSchedulerContextProps, 'productID' | 'allAuthConfigured'>) => {
  for (const [key, value] of Object.entries(requiredOauth)) {
    if (value && !configuredOauth[key]) {
      return false;
    }
  }

  return true;
};

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindInterviewSchedulerEventsLayoutQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  requiredOAuthByProductTitle: requiredOauth,
  configuredOAuthByProductTitle: configuredOauth,
  productByTitle: { id: productID },
  children,
}: CellSuccessProps<
  FindInterviewSchedulerEventsLayoutQuery,
  FindInterviewSchedulerEventsLayoutQueryVariables
> & { children: ReactNode }) => {
  const authConfigured = allRequiredConfigured({
    requiredOauth,
    configuredOauth,
  });

  return (
    <InterviewSchedulerContext.Provider
      value={{
        requiredOauth,
        configuredOauth,
        productID,
        allAuthConfigured: authConfigured,
      }}
    >
      {children}
    </InterviewSchedulerContext.Provider>
  );
};
