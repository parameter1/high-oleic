const sendgrid = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('./env');

sendgrid.setApiKey(SENDGRID_API_KEY);

module.exports = sendgrid;
