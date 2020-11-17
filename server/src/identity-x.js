const fetch = require('node-fetch');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');

module.exports = ({
  req,
  uri,
  appId,
} = {}) => new ApolloClient({
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
