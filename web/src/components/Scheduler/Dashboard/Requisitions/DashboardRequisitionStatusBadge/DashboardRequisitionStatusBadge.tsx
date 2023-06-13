import { FC } from 'react';

const DashboardRequisitionStatusBadge: FC<{ status: string }> = ({
  status,
}) => {
  switch (status) {
    case 'open':
      return (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          {status}
        </span>
      );
    case 'done':
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {status}
        </span>
      );
    case 'closed':
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
          {status}
        </span>
      );
    case 'inprogress':
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          {status}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          {status}
        </span>
      );
  }
};

export default DashboardRequisitionStatusBadge;
