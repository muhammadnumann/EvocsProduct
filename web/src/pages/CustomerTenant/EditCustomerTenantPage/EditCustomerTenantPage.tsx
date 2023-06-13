import EditCustomerTenantCell from 'src/components/CustomerTenant/EditCustomerTenantCell';

type CustomerTenantPageProps = {
  id: number;
};

const EditCustomerTenantPage = ({ id }: CustomerTenantPageProps) => {
  return <EditCustomerTenantCell id={id} />;
};

export default EditCustomerTenantPage;
