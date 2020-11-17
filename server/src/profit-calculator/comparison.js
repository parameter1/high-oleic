const calculator = require('./index');

module.exports = ({ acres, farmFields = [] } = {}) => {
  const reports = farmFields.map((farmField) => calculator({ ...farmField, acres }));
  return reports;
};
