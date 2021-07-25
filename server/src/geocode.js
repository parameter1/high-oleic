const fetch = require('node-fetch');
const { GOOGLE_GEOCODE_API_KEY } = require('./env');

const query = async (params = {}) => {
  const p = new URLSearchParams({
    ...params,
    key: GOOGLE_GEOCODE_API_KEY,
  });
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${p}`;
  const res = await fetch(url, { method: 'GET' });
  const json = await res.json();
  return json;
};

const forPostalCode = async ({ postalCode } = {}) => query({
  components: `postal_code:${postalCode}`,
});

module.exports = {
  forPostalCode,
  query,
};
