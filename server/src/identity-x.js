const fetch = require('node-fetch');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');
const { gql } = require('apollo-server-express');

const LOAD_CURRENT_USER = gql`
  query LoadCurrentUser {
    activeAppUser {
      id
      email
    }
  }
`;

const LOAD_USER = gql`
  query LoadUser($email: String!) {
    appUser(input: { email: $email }) {
      id
      email
    }
  }
`;

class IdentityX {
  /**
   *
   * @param {object} params
   */
  constructor({ req, uri, appId }) {
    this.client = new ApolloClient({
      connectToDevTools: false,
      ssrMode: true,
      link: createHttpLink({
        uri,
        fetch,
        headers: {
          'x-app-id': appId,
          'x-forwarded-for': req.ip,
          'user-agent': req.get('user-agent'),
        },
      }),
      cache: new InMemoryCache(),
    });
  }

  /**
   *
   */
  query(...args) {
    return this.client.query(...args);
  }

  /**
   *
   */
  async getCurrentUser({ token } = {}) {
    const { data } = await this.query({
      query: LOAD_CURRENT_USER,
      context: { headers: { authorization: `AppUser ${token}` } },
    });
    return data.activeAppUser;
  }

  /**
   *
   */
  async getUser({ email } = {}) {
    const { data } = await this.query({ query: LOAD_USER, variables: { email } });
    return data.appUser;
  }

  /**
   *
   */
  async getCurrentApp({ fields } = {}) {
    const { data } = await this.query({
      query: gql`
        query CurrentApplication {
          activeApplication {
            ${fields}
          }
        }
      `,
    });
    return data.activeApplication;
  }
}

module.exports = ({ req, uri, appId } = {}) => new IdentityX({ req, uri, appId });
