const mongodb = require('./index');
const indexes = require('./indexes');
const { MONGO_DB_NAME } = require('../env');

module.exports = () => mongodb
  .buildIndexesFor({ dbName: MONGO_DB_NAME, obj: indexes, forceBackground: true });
