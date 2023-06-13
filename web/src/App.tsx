import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';

import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import { AuthProvider, useAuth } from './auth';
import { OrgIDProvider } from './components/OrgIDContext/OrgIDContext';
import { ProductRunnerClientProvider } from './components/ProductRunnerContext/ProductRunnerContext';

import './scaffold.css';
import './index.css';

export enum RoleList {
  User = 'user',
  CustomerAdmin = 'customer_admin',
  EvocsInternal = 'evocs_internal',
  JobServiceWorker = 'job_service_worker',
  Admin = 'admin',
}

const App = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <ProductRunnerClientProvider>
            <OrgIDProvider>
              <Routes />
            </OrgIDProvider>
          </ProductRunnerClientProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
