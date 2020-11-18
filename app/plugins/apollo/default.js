module.exports = ({ $config }) => ({
  httpEndpoint: process.env.GRAPHQL_URI || $config.graphqlUri,
  browserHttpEndpoint: process.env.BROWSER_GRAPHQL_URI || $config.graphqlBrowser,
});
