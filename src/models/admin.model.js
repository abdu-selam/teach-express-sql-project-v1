const pool = require("../config/db.config");

class Admin {
  // select by id, email

  static async findById(id) {
    const [result] = await pool.execute("SELECT * FROM admin WHERE id = ?", [id]);

    return result[0]
  }

  static async findByEmail(email) {
    const [result] = await pool.execute(
        'SELECT * FROM admin WHERE email = ?',
        [email]
    )

    return result[0]
  }
}

module.exports = Admin
