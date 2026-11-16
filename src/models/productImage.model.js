const pool = require("../config/db.config");

class ProductImage {
  static async findById(id) {
    const [result] = await pool.execute(
      "SELECT * FROM product_images WHERE id = ?",
      [id],
    );

    return result[0];
  }

  static async create({ url, image_type, product }) {
    const [result] = await pool.execute(
      `INSERT INTO product_images(id, url, image_type, product) VALUES (UUID(), ?, ?, ?)`,
      [url, image_type, product],
    );

    return result;
  }
}

module.exports = ProductImage;
