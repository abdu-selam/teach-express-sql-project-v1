const app = require("./src/app");
const seed = require("./src/seed");
const env = require("./src/utils/env");

const start = async () => {
  await seed();
  app.listen(env.PORT, () => {
    console.log(`Server is running on PORT = ${env.PORT}`);
  });
};

start();