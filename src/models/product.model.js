const pool = require("../config/db.config");

class Product {
  static async findById(id) {
    const [result] = await pool.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    return result[0];
  }

  static async create({
    title,
    description = "",
    price,
    model,
    brand,
    ram,
    storage,
    battery,
    charge,
    frontCamera,
    backCamera,
    stoke = 1,
  }) {
    const id = crypto.randomUUID();
    const [result] = await pool.execute(
      `INSERT INTO 
      products(
        id, title, description, price, model,
        brand, ram, storage, battery, charge,
        front_camera, back_camera, stoke
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?
      );`,
      [
        id,
        title,
        description,
        price,
        model,
        brand,
        ram,
        storage,
        battery,
        charge,
        frontCamera,
        backCamera,
        stoke,
      ],
    );

    return id;
  }
}

module.exports = Product;
