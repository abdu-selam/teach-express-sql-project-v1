const argon2 = require("argon2");
const pool = require("./config/db.config");
const env = require("./utils/env");
const Admin = require("./models/admin.model");
const { products } = require("../seed/seed-values");
const Product = require("./models/product.model");
const fs = require("fs/promises");
const path = require("path");
const { fileNameGenerator, uploadImage } = require("./utils/fileHandler");
const ProductImage = require("./models/productImage.model");

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

const addProductImages = async ({ title, id }) => {
  const file = path.join(process.cwd(), "seed", "images", `${title}.jpg`);
  // read image file and generate buffer
  const buffer = await fs.readFile(file);
  // generate name
  const name = fileNameGenerator(`${title}.jpg`);
  // save to uploads folder
  await uploadImage(buffer, name);
  // generate url
  const url = `${env.SERVER_URL}/images/${name}`;
  // add images to the db
  await ProductImage.create({ url, image_type: "thumbnail", product: id });
};

const addProducts = async () => {
  const productOne = products[0];
  const product = await Product.findByTitle(productOne.title);
  if (product) {
    return;
  }
  // add products
  const productsIds = await Promise.all(
    products.map((product) => Product.seedCreate(product)),
  );

  // add product images
  await Promise.all(products.map((product) => addProductImages(product)));
};

const seed = async () => {
  await addAdmin();
  await addProducts();
};

module.exports = seed;
