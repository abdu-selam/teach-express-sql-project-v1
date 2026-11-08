const jwt = require("jsonwebtoken");
const env = require("./env");

// crypto.randonUUID()
const signJwt = (id) => {
  const token = jwt.sign({ id }, env.JWT_KEY, {
    expiresIn: "7d", // m: minute, h: hour, d: day
  });

  return token;
};

const verifyJwt = (token) => {
  try {
    const payload = jwt.verify(token, env.JWT_KEY);
    return payload;
  } catch (error) {
    return null;
  }
};

module.exports = {
  signJwt,
  verifyJwt,
};
