import type {
  FindCandidateRequisitionDetailQuery,
  FindCandidateRequisitionDetailQueryVariables,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CandidateRequisition from '../CandidateRequisition/CandidateRequisition';

export const QUERY = gql`
  query FindCandidateRequisitionDetailQuery($id: Int!) {
    candidateRequisitionDetail: candidateRequisition(id: $id) {
      id

      Notes {
        id
        content
        createdAt
        upatedAt

        User {
          id
          name
          email
          avatarURL
        }
      }

      Requisition {
        id
        title
        createdAt
        updatedAt
      }

      Candidate {
        id
        name
        email
        mobilePhone
        homePhone
        profilePictureURL
        about
        createdAt
        updatedAt

        Attachments {
          id
          title
          url
        }
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindCandidateRequisitionDetailQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  candidateRequisitionDetail,
}: CellSuccessProps<
  FindCandidateRequisitionDetailQuery,
  FindCandidateRequisitionDetailQueryVariables
>) => {
  return (
    <CandidateRequisition
      candidateRequisitionDetail={candidateRequisitionDetail}
    />
  );
};
