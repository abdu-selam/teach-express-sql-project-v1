const multer = require("multer");
const AppError = require("../utils/error");

const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status !== 500 ? err.message : "Internal Server Error!";

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (status === 500) {
    console.log(err.message);
  }

  res.status(status).json({
    error: message,
  });
};

const pathNotFound = (req, res, next) => {
  throw new AppError("404 path not found", 404);
};

module.exports = {
  errorMiddleware,
  pathNotFound,
};
