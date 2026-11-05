const app = require("./src/app");
const env = require("./src/utils/env");

app.listen(env.PORT, () => {
    console.log(`Server is running on PORT = ${env.PORT}`)
})