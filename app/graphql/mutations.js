import gql from 'graphql-tag';

export const AUTHENTICATE = gql`
  mutation Authenticate($token: String!) {
    loginAppUser(input: { token: $token }) {
      token {
        id
        value
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createAppUser(input: { email: $email }) {
      id
      email
    }
  }
`;

export const SEND_LOGIN_LINK = gql`
  mutation SendLoginLink($input: SendAppUserLoginLinkMutationInput!) {
    sendAppUserLoginLink(input: $input)
  }
`;
