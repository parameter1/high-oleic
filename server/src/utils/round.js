module.exports = (v, precision = 2) => Math.round(v * 10 ** precision) / 10 ** precision;
