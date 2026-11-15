const multer = require("multer");
const path = require("path");
const AppError = require("../utils/error");

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const unique = `${Date.now()}${ext}`;

    cb(null, unique);
  },
});
// const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!allowed.includes(file.mimetype)) {
    cb(new AppError("Invalid file type", 400));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 1 * 1024 * 1024
  }
});

module.exports = {
  upload,
};
