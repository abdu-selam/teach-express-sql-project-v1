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

const genOTP = () => {
  // let token = "";
  // for (let i = 0; i < 6; i++) {
  //   // 0, 1, 2, 3, 4, 5
  //   const randomNum = Math.floor(Math.random() * 10);
  //   token += randomNum.toString();
  // }
  // Math.floor(Math.random() * (max - min + 1)) + min
  const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  return `${token}`;
};

module.exports = {
  signJwt,
  verifyJwt,
  genOTP,
};
