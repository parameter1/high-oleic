const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const { isProduction } = require('../env');

module.exports = ({ app, path }) => {
  const server = new ApolloServer({
    schema,
    tracing: false,
    cacheControl: false,
    introspection: true,
    debug: !isProduction,
    playground: !isProduction ? { endpoint: path } : false,
  });
  server.applyMiddleware({ app, path });
};
