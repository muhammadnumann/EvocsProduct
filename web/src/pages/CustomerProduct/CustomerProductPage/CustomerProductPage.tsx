import CustomerProductCell from 'src/components/CustomerProduct/CustomerProductCell';

type CustomerProductPageProps = {
  id: number;
};

const CustomerProductPage = ({ id }: CustomerProductPageProps) => {
  return <CustomerProductCell id={id} />;
};

export default CustomerProductPage;
