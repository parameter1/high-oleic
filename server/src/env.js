const {
  bool,
  port,
  cleanEnv,
  str,
} = require('envalid');

module.exports = cleanEnv(process.env, {
  HOST: str({ desc: 'The host that the service will run on.', default: '0.0.0.0' }),
  IDENTITY_X_APP_ID: str({ desc: 'The IdentityX Application ID to use.', default: '5fb2d401b8a845090ecc01d1' }),
  IDENTITY_X_URI: str({ desc: 'The IdentityX API URI', default: 'https://identity-x.parameter1.com/graphql' }),
  MONGO_DB_NAME: str({ desc: 'The MongoDB database name to use.', default: 'usb-profit-calculator' }),
  MONGO_URI: str({ desc: 'The MongoDB instance to connect to.' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: str({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  PORT: port({ desc: 'The port that the service will run on.', default: 80 }),
  SENDGRID_API_KEY: str({ desc: 'The SendGrid API key for sending email.' }),
});
