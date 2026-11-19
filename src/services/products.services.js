const Product = require("../models/product.model");
const { uploadImage, fileNameGenerator } = require("../utils/fileHandler");
const ProductImage = require("../models/productImage.model");
const env = require("../utils/env");
const { isNumber } = require("../utils/validate");

const createProduct = async ({
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
  thumbnail,
  images,
}) => {
  const productId = await Product.create({
    title,
    description: description || "",
    price,
    model,
    brand,
    ram,
    storage,
    battery,
    charge,
    frontCamera,
    backCamera,
    stoke: stoke || 1,
  });

  const thumbnailName = fileNameGenerator(thumbnail.originalname);
  const imageNames = images.map((image) =>
    fileNameGenerator(image.originalname),
  );

  await uploadImage(thumbnail.buffer, thumbnailName);
  await Promise.all(
    images.map((image, i) => uploadImage(image.buffer, imageNames[i])),
  );

  await ProductImage.create({
    url: `${env.SERVER_URL}/images/${thumbnailName}`,
    image_type: "thumbnail",
    product: productId,
  });

  await Promise.all(
    images.map((image, i) => {
      return ProductImage.create({
        url: `${env.SERVER_URL}/images/${imageNames[i]}`,
        product: productId,
        image_type: "image",
      });
    }),
  );
};

const filterProducts = (query) => {
  /*
    Filters:
      - min price
      - max price
      - brand: list
      - ram: list
      - storage: list

      - soting
        - price
        - title
      
      - order
        - asc
        - dsc
  */
  const { min_price, max_price, brand, ram, storage, sort, order, search } =
    query;
  let sql = "SELECT * FROM products WHERE 1=1";
  const values = [];

  if (search && search.trim()) {
    sql += " AND (title LIKE ? OR description LIKE ?)";
    values.push(`%${search.trim()}%`);
    values.push(`%${search.trim()}%`);
  }

  if (isNumber(min_price)) {
    const minPrice = Number(min_price);

    if (minPrice > 0) {
      sql += " AND price >= ?";
      values.push(minPrice);
    }
  }

  if (isNumber(max_price)) {
    const maxPrice = Number(max_price);

    if (maxPrice > 0) {
      sql += " AND price <= ?";
      values.push(maxPrice);
    }
  }

  if (brand) {
    if (typeof brand === "string") {
      sql += " AND brand = ?";
      values.push(brand);
    } else if (Array.isArray(brand)) {
      let brandSql = " AND (1=0";
      brand.forEach((br) => {
        brandSql += " OR brand = ?";
        values.push(br);
      });
      brandSql += ")";
      if (brand.length) {
        sql += brandSql;
      }
    }
  }

  if (ram) {
    if (typeof ram === "string") {
      sql += " AND ram = ?";
      values.push(ram);
    } else if (Array.isArray(ram)) {
      let ramSql = " AND (1=0";
      ram.forEach((rm) => {
        ramSql += " OR ram = ?";
        values.push(rm);
      });
      ramSql += ")";
      if (ram.length) {
        sql += ramSql;
      }
    }
  }

  if (storage) {
    if (typeof storage === "string") {
      sql += " AND storage = ?";
      values.push(storage);
    } else if (Array.isArray(storage)) {
      let storageSql = " AND (1=0";
      storage.forEach((st) => {
        storageSql += " OR storage = ?";
        values.push(st);
      });
      storageSql += ")";
      if (storage.length) {
        sql += storageSql;
      }
    }
  }

  if (["price", "title"].includes(sort)) {
    const sqlOrder = ["asc", "desc"].includes(order)
      ? order.toUpperCase()
      : "ASC";

    sql += ` ORDER BY ${sort} ${sqlOrder}`;
  }

  return { sql, values };
};

module.exports = {
  createProduct,
  filterProducts,
};
