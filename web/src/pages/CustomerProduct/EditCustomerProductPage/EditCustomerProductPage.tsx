import EditCustomerProductCell from 'src/components/CustomerProduct/EditCustomerProductCell';

type CustomerProductPageProps = {
  id: number;
};

const EditCustomerProductPage = ({ id }: CustomerProductPageProps) => {
  return <EditCustomerProductCell id={id} />;
};

export default EditCustomerProductPage;
