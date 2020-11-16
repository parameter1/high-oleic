const merge = require('lodash.merge');
const { ObjectId } = require('@parameter1/mongodb');
const GraphQLDate = require('@parameter1/graphql-type-date');
const GraphQLObjectID = require('@parameter1/graphql-type-objectid');
const pagination = require('@parameter1/graphql-mongodb-pagination/resolvers');

const expense = require('./expense');
const farm = require('./farm');
const farmField = require('./farm-field');
const income = require('./income');
const report = require('./report');

const genericResolveType = (_, __, info) => info.returnType.ofType.name;

module.exports = merge(
  pagination,

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
    CropTypeEnum: {
      CORN: 'corn',
      SOY: 'soy',
      OLEIC: 'oleic',
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
      ping() {
        return 'pong';
      },
    },
  },
);
