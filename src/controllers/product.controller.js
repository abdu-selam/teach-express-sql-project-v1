const fs = require("fs/promises");
const path = require("path");

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
  console.log(req.files)
  console.log(req.file)

  res.status(200).json({
    message: "Success"
  })
};

module.exports = {
  createProduct,
};
