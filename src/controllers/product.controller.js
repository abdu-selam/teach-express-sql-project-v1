const AppError = require("../utils/error");
const { isNumber } = require("../utils/validate");
const services = require("../services/products.services");
const Product = require("../models/product.model");

// const createProduct = async (req, res) => {
//   /* recieve:
//         * title,

//         description,

//         *price,
//         *model,
//         *brand,
//         *ram,
//         *storage,
//         *battery,
//         *charge,
//         *front_camera,
//         *back_camera,

//         stoke,

//         *thubnail,
//         images
//   */

//   // console.log(req.body);
//   console.log(req.file); // single
//   console.log(req.files); // array
//   // const filename = path.join(
//   //   process.cwd(),
//   //   "uploads",
//   //   `${crypto.randomUUID()}-${req.file.originalname}`,
//   // );

//   // const start = Date.now();
//   // while (Date.now() - start < 3000) {}

//   // await fs.writeFile(filename, req.file.buffer);

//   res.status(200).json({ message: "served" });
// };

const createProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    model,
    brand,
    ram,
    storage,
    battery,
    charge,
    front_camera,
    back_camera,
    stoke,
  } = req.body || {};

  if (
    !title ||
    !price ||
    !model ||
    !brand ||
    !ram ||
    !storage ||
    !battery ||
    !charge ||
    !front_camera ||
    !back_camera
  ) {
    throw new AppError("Incomplete fields", 400);
  }

  /*
    price -> number
  */
  if (!isNumber(price)) {
    throw new AppError("Price must be a number", 400);
  }

  const priceVal = Number(price).toFixed(2);
  if (priceVal <= 0) {
    throw new AppError("Price must be positive", 400);
  }

  const thumbnail = req.files.thumbnail[0];
  const images = req.files.images;

  await services.createProduct({
    title,
    description: description || "",
    price: priceVal,
    model,
    brand,
    ram,
    storage,
    battery,
    charge,
    frontCamera: front_camera,
    backCamera: back_camera,
    stoke: stoke || 1,
    thumbnail,
    images,
  });

  res.status(200).json({
    message: "Product has been created",
    product: productId,
  });
};

const getProducts = async (req, res) => {
  // console.log(req.query);
  const { sql, values } = services.filterProducts(req.query);
  const products = await Product.find(sql, values);

  res.status(200).json({
    products,
  });
};

module.exports = {
  createProduct,
  getProducts,
};
