// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  userHasGoogleAuth: true,
  args: {
    userID: 1,
    productID: 1,
  },
  scopes:
    'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/directory.readonly',
});
