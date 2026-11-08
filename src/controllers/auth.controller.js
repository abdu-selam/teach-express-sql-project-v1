const AppError = require("../utils/error");
const Admin = require("../models/admin.model");
const argon2 = require("argon2");
const { signJwt } = require("../utils/jwt");
const env = require("../utils/env");

const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // find user from database (email)
  const admin = await Admin.findByEmail(email);

  if (!admin) {
    throw new AppError("Invalid Cridentials", 401);
  }

  // allow access for a single user only (password)
  const isValidPassword = await argon2.verify(admin.password, password);

  if (!isValidPassword) {
    throw new AppError("Invalid Cridentials", 401);
  }

  const token = signJwt(admin.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "You are successfully loged in",
    data: {
      name: admin.name,
    },
  });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body || {};

  if (!oldPassword || !newPassword) {
    throw new AppError("All fields are required", 400);
  }

  const isCorrectPassword = await argon2.verify(req.user.password, oldPassword);
  if (!isCorrectPassword) {
    throw new AppError("Invalid Cridential", 401);
  }

  const hashed = await argon2.hash(newPassword);
  await Admin.updatePassword(req.user.id, hashed);

  res.status(200).json({
    message: "Password updated succesfully",
  });
};

module.exports = {
  login,
  changePassword,
};
