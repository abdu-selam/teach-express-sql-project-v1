const brevo = require("../config/email.config");
const env = require("./env");

const sendEmail = async (email, name, html, subject) => {
  const result = await brevo.transactionalEmails.sendTransacEmail({
    subject,
    htmlContent: html,
    sender: { name: "Phone Store", email: env.BREVO_EMAIL },
    to: [{ email, name }],
  });
};

module.exports = {
  sendEmail,
};
