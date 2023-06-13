import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type RequiredOAuthLayoutProps = {
  children: React.ReactNode;
};

const RequiredOAuthsLayout = ({ children }: RequiredOAuthLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.requiredOAuths()} className="rw-link">
            Required OAuths
          </Link>
        </h1>
        <Link
          to={routes.newRequiredOAuth()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Required OAuth
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default RequiredOAuthsLayout;
