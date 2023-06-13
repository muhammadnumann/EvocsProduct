import { RoleList } from 'src/lib/auth';

export const mockUser = () => {
  mockCurrentUser({
    userID: 123,
    customerID: 456,
    orgID: 'auth0uuid',
    roles: [RoleList.Admin, RoleList.EvocsInternal],
    userInfo: {
      name: 'Dannyboy Russo',
      email: 'dan@evocs.tech',
      picture: 'https://google.com',
    },
  });
};
