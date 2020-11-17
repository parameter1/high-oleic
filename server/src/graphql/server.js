const { ApolloServer } = require('apollo-server-express');
const { STATUS_CODES } = require('http');
const { get, set } = require('@parameter1/utils');
const depthLimit = require('graphql-depth-limit');
const schema = require('./schema');
const context = require('./context');
const { isProduction } = require('../env');

module.exports = ({ app, path }) => {
  const server = new ApolloServer({
    schema,
    context,
    tracing: false,
    cacheControl: false,
    introspection: true,
    debug: !isProduction,
    playground: !isProduction ? { endpoint: path } : false,
    validationRules: [
      depthLimit(8),
    ],
    formatError: (err) => {
      const code = get(err, 'extensions.exception.statusCode');
      if (code) set(err, 'extensions.code', STATUS_CODES[code].replace(/\s/g, '_').toUpperCase());
      return err;
    },
  });
  server.applyMiddleware({ app, path });
};
