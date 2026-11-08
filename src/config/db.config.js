const mysql = require("mysql2/promise");
const env = require("../utils/env");

const pool = mysql.createPool({
  host: env.DB_HOST, // changable,
  port: env.DB_PORT, // changable
  user: env.DB_USER, // sensative
  password: env.DB_PASSWORD, // sensative
  database: env.DB_NAME, // changable
});

module.exports = pool;
