import { LOOKUP_USER } from '../graphql/queries';
import { CREATE_USER, SEND_LOGIN_LINK } from '../graphql/mutations';

export default async (apollo, { email, redirectTo }) => {
  const { data } = await apollo.query({ query: LOOKUP_USER, variables: { email } });
  let { appUser } = data;

  if (!appUser) {
    const { data: newUser } = await apollo.mutate({ mutation: CREATE_USER, variables: { email } });
    appUser = newUser.createAppUser;
  }

  const input = { email, authUrl: `${window.location.origin}/authenticate`, redirectTo };
  return apollo.mutate({ mutation: SEND_LOGIN_LINK, variables: { input } });
};
