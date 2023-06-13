import CustomerTenantCell from 'src/components/CustomerTenant/CustomerTenantCell';

type CustomerTenantPageProps = {
  id: number;
};

const CustomerTenantPage = ({ id }: CustomerTenantPageProps) => {
  return <CustomerTenantCell id={id} />;
};

export default CustomerTenantPage;
