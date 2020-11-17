const merge = require('lodash.merge');
const { ObjectId } = require('@parameter1/mongodb');
const GraphQLDate = require('@parameter1/graphql-type-date');
const GraphQLObjectID = require('@parameter1/graphql-type-objectid');
const pagination = require('@parameter1/graphql-mongodb-pagination/resolvers');

const cropComparison = require('./crop-comparison');
const cropType = require('./crop-type');
const expense = require('./expense');
const farm = require('./farm');
const farmField = require('./farm-field');
const income = require('./income');
const report = require('./report');
const user = require('./user');

const genericResolveType = (_, __, info) => info.returnType.ofType.name;

module.exports = merge(
  pagination,

  cropComparison,
  cropType,
  expense,
  farm,
  farmField,
  income,
  report,
  user,
  {
    Date: GraphQLDate,
    ObjectID: GraphQLObjectID(ObjectId),

    /**
     *
     */
    ChangedDateInterface: {
      /**
       *
       */
      __resolveType: genericResolveType,
    },

    /**
     *
     */
    CurrencyUnitEnum: {
      PER_ACRE: 'perAcre',
      PER_BUSHEL: 'perBushel',
      FLAT: 'flat',
    },

    /**
     *
     */
    Mutation: {
      /**
       *
       */
      ping() {
        return 'pong';
      },
    },

    /**
     *
     */
    Query: {
      /**
       *
       */
      async ping() {
        return 'pong';
      },
    },
  },
);
