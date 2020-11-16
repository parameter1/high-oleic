const { inspect } = require('util');
const { corn, soy, oleic } = require('./data');
const summary = require('../summary');

const { log } = console;

const result = summary({
  farmFields: [corn, soy, oleic],
});

log(inspect(result, { colors: true, depth: 7 }));
