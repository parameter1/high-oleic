const { inspect } = require('util');
const calculator = require('../index');
const { oleic } = require('./data');

const { log } = console;

const result = calculator(oleic);

log(inspect(result, { colors: true, depth: 7 }));
