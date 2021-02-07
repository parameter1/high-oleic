const { getAsObject } = require('@parameter1/utils');
const sendgrid = require('../sendgrid');

const stripLines = (value) => {
  if (!value) return undefined;
  return `${value}`.trim().replace(/[\r\n]/g, ' ').replace(/\s\s+/g, ' ');
};

module.exports = async ({
  identityX,
  fromEmail,
  link,
  to,
  message,
}) => {
  const fields = `
    id
    name
    email
    organization {
      id
      company {
        id
        name
        streetAddress
        city
        regionName
        postalCode
        phoneNumber
        supportEmail
      }
    }
  `;
  const app = await identityX.getCurrentApp({ fields });
  const company = getAsObject(app, 'organization.company');

  const addressFields = ['name', 'streetAddress', 'city', 'regionName', 'postalCode'];
  const addressValues = addressFields.map((field) => stripLines(company[field])).filter((v) => v);
  const supportEmail = app.email || company.supportEmail;
  if (!supportEmail) throw new Error('Unable to retrieve a support email.');
  addressValues.push(supportEmail);

  const messageHtml = message
    ? `<p>The user also included the following message:</p><p>${message.replace(/\n/g, '<br>')}</p>`
    : '';
  const messageText = message
    ? `The user also included the following message:\n${message}`
    : '';

  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" id="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0">
        <title>A user has shared a High Oleic Scenario Report with you</title>
      </head>
      <body>
        <p>Hello,</p>
        <p>The user <em>${fromEmail}</em> on the website <strong>${app.name}</strong> would like to share their High Oleic Scenario Report with you.</p>
        <p>To view the report, please visit <a href="${link}">${link}</a></p>
        ${messageHtml}
        <hr>
        <small style="font-color: #ccc;">
          <p>Please add <em>${supportEmail}</em> to your address book or safe sender list to ensure you receive future emails from us.</p>
          <p>You are receiving this email because a user shared a report on ${app.name}.</p>
          <p>For additional information please contact ${app.name} c/o ${addressValues.join(', ')}.</p>
        </small>
      </body>
    </html>
  `;

  const text = `
Hello,

The user ${fromEmail} on the website ${app.name} would like to share their High Oleic Scenario Report with you.

To view the report, please visit ${link}

${messageText}

-------------------------

Please add ${supportEmail} to your address book or safe sender list to ensure you receive future emails from us.
You are receiving this email because a user shared a report on ${app.name}.
For additional information please contact ${app.name} c/o ${addressValues.join(', ')}.
  `;

  return sendgrid.send({
    to,
    from: `${app.name} <${supportEmail}>`,
    replyTo: fromEmail,
    subject: 'A user has shared a High Oleic Scenario Report with you',
    html,
    text,
  });
};
