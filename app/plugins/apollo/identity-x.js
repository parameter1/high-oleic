module.exports = ({ $config }) => ({
  httpEndpoint: $config.idxUri,
  httpLinkOptions: {
    headers: { 'x-app-id': $config.idxAppId },
  },
});
