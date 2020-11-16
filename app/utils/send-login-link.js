import gql from 'graphql-tag';

const LOOKUP_USER = gql`
  query LookupUser($email: String!) {
    appUser(input: { email: $email }) {
      id
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createAppUser(input: { email: $email }) {
      id
      email
    }
  }
`;

const SEND_LOGIN_LINK = gql`
  mutation SendLoginLink($input: SendAppUserLoginLinkMutationInput!) {
    sendAppUserLoginLink(input: $input)
  }
`;

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
