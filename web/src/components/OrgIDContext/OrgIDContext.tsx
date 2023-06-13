import { FC, ReactChild, useEffect, useState } from 'react';

import { useAuth } from 'src/auth';

export const orgIDLocalStorageKey = 'orgID';

type ProviderProps = {
  children?: ReactChild;
};
export const OrgIDProvider: FC<ProviderProps> = ({ children }) => {
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [orgIDSet, setOrgIDSet] = useState(false);

  useEffect(() => {
    const getSetOrgID = async () => {
      const { orgID } = await getCurrentUser();
      localStorage.setItem(orgIDLocalStorageKey, orgID);
      setOrgIDSet(true);
    };

    if (isAuthenticated && !orgIDSet) {
      getSetOrgID();
    }
  }, [isAuthenticated, getCurrentUser, orgIDSet]);

  return <>{children}</>;
};
