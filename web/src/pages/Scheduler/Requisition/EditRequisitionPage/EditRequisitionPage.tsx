import EditRequisitionCell from 'src/components/Scheduler/Requisition/EditRequisitionCell';

type RequisitionPageProps = {
  id: number;
};

const EditRequisitionPage = ({ id }: RequisitionPageProps) => {
  return <EditRequisitionCell id={id} />;
};

export default EditRequisitionPage;
