/* eslint-disable no-underscore-dangle */
const fetch = require('node-fetch'); // eslint-disable-line
const fs = require('fs');
const path = require('path');

const { log } = console;

const run = async () => {
  const res = await fetch('http://server.highsoy.com:53190/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    }),
  });
  const result = await res.json();
  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = result.data.__schema.types.filter(
    (type) => type.possibleTypes !== null,
  );
  // eslint-disable-next-line no-param-reassign
  result.data.__schema.types = filteredData;
  fs.writeFile(path.join(__dirname, 'plugins/apollo', 'fragment-types.json'), JSON.stringify(result.data), (err) => {
    if (err) log('Error writing fragmentTypes file', err);
    log('Fragment types successfully extracted!');
  });
};

run().catch((e) => setImmediate(() => { throw e; }));
