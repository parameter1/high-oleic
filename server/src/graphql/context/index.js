const dataloaders = require('../dataloaders');
const repos = require('../../repo');
const createIDXClient = require('../../identity-x');
const AuthContext = require('./auth');
const { IDENTITY_X_APP_ID, IDENTITY_X_URI } = require('../../env');

module.exports = async ({ req }) => {
  const idx = createIDXClient({
    req,
    uri: IDENTITY_X_URI,
    appId: IDENTITY_X_APP_ID,
  });
  const auth = new AuthContext({ header: req.get('authorization'), idx });
  const loaders = await dataloaders({ repos });
  return {
    auth,
    idx,
    loaders,
    repos,
  };
};
