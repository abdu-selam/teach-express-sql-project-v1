const { config } = require("dotenv");
config();

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = env
