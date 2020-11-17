const merge = require('lodash.merge');
const { ObjectId } = require('@parameter1/mongodb');
const GraphQLDate = require('@parameter1/graphql-type-date');
const GraphQLObjectID = require('@parameter1/graphql-type-objectid');
const pagination = require('@parameter1/graphql-mongodb-pagination/resolvers');

const cropType = require('./crop-type');
const expense = require('./expense');
const farm = require('./farm');
const farmField = require('./farm-field');
const income = require('./income');
const report = require('./report');

const genericResolveType = (_, __, info) => info.returnType.ofType.name;

module.exports = merge(
  pagination,

  cropType,
  expense,
  farm,
  farmField,
  income,
  report,
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
      async ping(_, __, { auth }) {
        await auth.check();
        return 'pong';
      },
    },
  },
);
