const { config } = require("dotenv");
config();

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  JWT_KEY: process.env.JWT_KEY,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADDMIN_PASSWORD: process.env.ADDMIN_PASSWORD,
  ADMIN_NAME: process.env.ADMIN_NAME,
};

module.exports = env;
