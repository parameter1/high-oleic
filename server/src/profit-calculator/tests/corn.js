const { inspect } = require('util');
const calculator = require('../index');
const { corn } = require('./data');

const { log } = console;

const result = calculator(corn);

log(inspect(result, { colors: true, depth: 7 }));
