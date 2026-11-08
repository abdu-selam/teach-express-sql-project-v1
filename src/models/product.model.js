const pool = require("../config/db.config");

class Product {
  static async findById(id) {
    const [result] = await pool.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    return result[0];
  }
}

module.exports = Product;
