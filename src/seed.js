const argon2 = require("argon2");
const pool = require("./config/db.config");
const env = require("./utils/env");
const Admin = require("./models/admin.model");

const addAdmin = async () => {
  const admin = await Admin.findByEmail(env.ADMIN_EMAIL);
  if (admin) {
    return;
  }
  
  const hashed = await argon2.hash(env.ADDMIN_PASSWORD);

  const [result] = await pool.execute(
    `INSERT INTO admin (id, name, email, password) values(
            UUID(), ?, ? , ?
        );`,
    [env.ADMIN_NAME, env.ADMIN_EMAIL, hashed],
  );
};

const seed = async () => {
  await addAdmin();
};

module.exports = seed;
