import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type CustomerTenantLayoutProps = {
  children: React.ReactNode;
};

const CustomerTenantsLayout = ({ children }: CustomerTenantLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.customerTenants()} className="rw-link">
            Customer Tenants
          </Link>
        </h1>
        <Link
          to={routes.newCustomerTenant()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Customer Tenant
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default CustomerTenantsLayout;
