import { useAuth } from 'src/auth';
import ProductAuthCell from 'src/components/ProductAuthCell';

type ProductAuthPageProps = {
  productID: number;
};

const ProductAuthPage = ({ productID }: ProductAuthPageProps) => {
  const {
    currentUser: { userID },
  } = useAuth();
  return <ProductAuthCell args={{ userID, productID }} />;
};

export default ProductAuthPage;
