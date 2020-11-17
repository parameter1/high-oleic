const { inspect } = require('util');
const comparison = require('../comparison');

const { log } = console;

const result = comparison({
  acres: 800,
  farmFields: [
    {
      cropType: 'corn',
      revenuePerBushel: 3.6,
      totalBushels: 160000,
    },
    {
      cropType: 'oleic',
      revenuePerBushel: 0,
      totalBushels: 0,
    },
  ],
});

log(inspect(result, { colors: true, depth: 7 }));
