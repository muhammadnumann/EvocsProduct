import type { FindRequisitions } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Requisitions from 'src/components/Scheduler/Requisition/Requisitions';

export const QUERY = gql`
  query FindRequisitions {
    requisitions {
      id
      owningCustomerID
      owningUserID
      title
      summary
      wdRequisitionID
      status
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No requisitions yet. '}
      <Link to={routes.schedulerNewRequisition()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  requisitions,
}: CellSuccessProps<FindRequisitions>) => {
  return <Requisitions requisitions={requisitions} />;
};
