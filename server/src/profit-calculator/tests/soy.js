const { inspect } = require('util');
const calculator = require('../index');
const { soy } = require('./data');

const { log } = console;

const result = calculator(soy);

log(inspect(result, { colors: true, depth: 7 }));
