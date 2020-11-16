const client = require('../mongodb');
const { MONGO_DB_NAME: dbName } = require('../env');

const FarmRepo = require('./farm');
const FarmFieldRepo = require('./farm-field');
const ReportRepo = require('./report');

const farm = new FarmRepo({ client, dbName });
const report = new ReportRepo({ client, dbName, farmRepo: farm });
const farmField = new FarmFieldRepo({ client, dbName, reportRepo: report });

module.exports = {
  farm,
  farmField,
  report,
};
