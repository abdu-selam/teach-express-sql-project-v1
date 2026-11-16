const fs = require("fs/promises");
const path = require("path");

const uploadImage = async (buffer, filename) => {
  const folder = path.join(process.cwd(), "uploads");
  await fs.mkdir(folder, {
    recursive: true,
  });

  const location = path.join(process.cwd(), "uploads", filename);

  await fs.writeFile(location, buffer);
};

const fileNameGenerator = (originalname) => {
  const ext = path.extname(originalname);
  const uniqueName = `${crypto.randomUUID()}-${Date.now()}${ext}`;

  return uniqueName;
};

module.exports = {
  uploadImage,
  fileNameGenerator,
};
