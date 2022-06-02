const { grainElevator } = require('../repo');
const mongodb = require('../mongodb');

const { log } = console;

const fn = async () => {
  await mongodb.connect().then(() => log('MongoDB connected'));

  await grainElevator.bulkUpsertFromList();
  log('Update complete.');

  await mongodb.close();
};

fn().catch((e) => {
  console.log(e);
  process.exit(1);
}).then(() => process.exit(0));
