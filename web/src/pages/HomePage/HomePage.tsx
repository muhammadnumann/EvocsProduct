import { FC } from 'react';

import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';

import { RoleList } from 'src/App';
import { useAuth } from 'src/auth';

const UserAuthTools: FC = () => {
  const { loading, isAuthenticated, logIn, logOut, hasRole } = useAuth();

  if (loading) {
    return <span>Loading</span>;
  }

  return (
    <div>
      {hasRole([RoleList.EvocsInternal, RoleList.Admin]) && (
        <div>
          <h3>Product Links</h3>
          <ul>
            <li>
              <Link
                to={routes.schedulerHome()}
                className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
              >
                Interview Scheduler
              </Link>
            </li>
          </ul>
        </div>
      )}
      <button
        className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={async () => {
          if (isAuthenticated) {
            await logOut({ returnTo: process.env.AUTH0_REDIRECT_URI });
          } else {
            const searchParams = new URLSearchParams(window.location.search);
            await logIn({
              appState: { targetUrl: searchParams.get('redirectTo') },
            });
          }
        }}
      >
        {isAuthenticated ? 'Log out' : 'Log in'}
      </button>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      Home
      <UserAuthTools />
    </>
  );
};

export default HomePage;
