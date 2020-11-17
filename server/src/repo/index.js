const client = require('../mongodb');
const { MONGO_DB_NAME: dbName } = require('../env');

const CropComparisonRepo = require('./crop-comparison');
const FarmRepo = require('./farm');
const FarmFieldRepo = require('./farm-field');
const ReportRepo = require('./report');

const cropComparison = new CropComparisonRepo({ client, dbName });
const farm = new FarmRepo({ client, dbName });
const report = new ReportRepo({ client, dbName, farmRepo: farm });
const farmField = new FarmFieldRepo({ client, dbName, reportRepo: report });

module.exports = {
  cropComparison,
  farm,
  farmField,
  report,
};
