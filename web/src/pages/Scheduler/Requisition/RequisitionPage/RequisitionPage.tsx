import RequisitionCell from 'src/components/Scheduler/Requisition/RequisitionCell';

type RequisitionPageProps = {
  id: number;
};

const RequisitionPage = ({ id }: RequisitionPageProps) => {
  return <RequisitionCell id={id} />;
};

export default RequisitionPage;
