import gql from 'graphql-tag';

// eslint-disable-next-line
export const LOOKUP_USER = gql`
  query LookupUser($email: String!) {
    appUser(input: { email: $email }) {
      id
      email
    }
  }
`;
