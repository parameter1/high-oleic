const { InMemoryCache, IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const introspectionQueryResultData = require('./fragment-types.json');

const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

module.exports = ({ $config }) => ({
  httpEndpoint: process.env.GRAPHQL_URI || $config.graphqlUri,
  cache: new InMemoryCache({ fragmentMatcher }),
  browserHttpEndpoint: process.env.BROWSER_GRAPHQL_URI || $config.graphqlBrowser,
});
