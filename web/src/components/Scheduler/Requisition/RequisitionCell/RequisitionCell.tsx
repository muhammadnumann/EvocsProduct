import type { FindRequisitionById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Requisition from 'src/components/Scheduler/Requisition/Requisition';

export const QUERY = gql`
  query FindRequisitionById($id: Int!) {
    requisition: requisition(id: $id) {
      id
      owningCustomerID
      owningUserID
      title
      summary
      wdRequisitionID
      status
      createdAt
      updatedAt

      CandidateRequisitions {
        id
        status
        Candidate {
          id
          name
          email
        }
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Requisition not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  requisition,
}: CellSuccessProps<FindRequisitionById>) => {
  return <Requisition requisition={requisition} />;
};
