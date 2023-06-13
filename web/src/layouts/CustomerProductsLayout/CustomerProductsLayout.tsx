import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type CustomerProductLayoutProps = {
  children: React.ReactNode;
};

const CustomerProductsLayout = ({ children }: CustomerProductLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.customerProducts()} className="rw-link">
            Customer Products
          </Link>
        </h1>
        <Link
          to={routes.newCustomerProduct()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Customer Product
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default CustomerProductsLayout;
