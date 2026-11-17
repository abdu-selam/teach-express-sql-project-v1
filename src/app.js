const cookieParser = require("cookie-parser");
const express = require("express");
const authRoute = require("./routes/auth.route");
const {
  errorMiddleware,
  pathNotFound,
} = require("./middlewares/error.middleware");
const productRoute = require("./routes/product.route");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(
  path.join(process.cwd(), "uploads")
));

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);

app.use(pathNotFound);
app.use(errorMiddleware);

module.exports = app;
