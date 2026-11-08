const jwt = require("jsonwebtoken");
const env = require("./env");

// crypto.randonUUID()
const signJwt = (id) => {
  const token = jwt.sign({ id }, env.JWT_KEY, {
    expiresIn: "7d", // m: minute, h: hour, d: day
  });

  return token;
};

module.exports = {
  signJwt,
};
