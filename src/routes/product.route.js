const { Router } = require("express");
const {
  createProduct,
  getProducts,
} = require("../controllers/product.controller");
const { upload } = require("../middlewares/multer.middleware");
const { protectedRoute } = require("../middlewares/auth.middleware");

const route = Router();

// route.post("/", upload.single("image"),createProduct);
// route.post("/", upload.none(),createProduct);
// route.post("/", upload.array("image", 5),createProduct);
route.post(
  "/",
  protectedRoute,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createProduct,
);

route.get("/", getProducts);

module.exports = route;
