import type { FindRequiredOAuthById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import RequiredOAuth from 'src/components/RequiredOAuth/RequiredOAuth';

export const QUERY = gql`
  query FindRequiredOAuthById($id: Int!) {
    requiredOAuth: requiredOAuth(id: $id) {
      id
      google
      azureAD
      adFS
      ping
      adLDAP
      zoom
      customerProduct {
        id
        product {
          title
        }
        customer {
          name
        }
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>RequiredOAuth not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  requiredOAuth,
}: CellSuccessProps<FindRequiredOAuthById>) => {
  return <RequiredOAuth requiredOAuth={requiredOAuth} />;
};
