const { BrevoClient } = require("@getbrevo/brevo");
const env = require("../utils/env");

const brevo = new BrevoClient({ apiKey: env.BREVO_KEY });

module.exports = brevo;
