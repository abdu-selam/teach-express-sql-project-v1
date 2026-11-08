const Admin = require("../models/admin.model");
const AppError = require("../utils/error");
const { verifyJwt } = require("../utils/jwt");

const protectedRoute = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw AppError("Token Missed", 401);
  }

  const payload = verifyJwt(token); // {id: "kokdaksda-dIOKEF-ENWKENCKWE"}
  console.log(payload);

  if (!payload) {
    throw AppError("Invalid Token", 401);
  }

  const admin = await Admin.findById(payload.id);
  if (!admin) {
    throw AppError("Invalid Token", 401);
  }

  req.user = admin;
  next();
};

module.exports = {
  protectedRoute,
};
