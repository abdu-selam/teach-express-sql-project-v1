const AppError = require("../utils/error");
const Admin = require("../models/admin.model");
const argon2 = require("argon2");
const { signJwt, genOTP } = require("../utils/jwt");
const env = require("../utils/env");
const { sendEmail } = require("../utils/email");
const { forgotPasswordEmailTemplate } = require("../utils/email.templates");

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

const forgotPassword = async (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  const admin = await Admin.findByEmail(email);
  if (!admin) {
    throw new AppError("User not found", 404);
  }

  const otp = genOTP();
  await Admin.addForgotToken(admin.id, otp);

  const html = forgotPasswordEmailTemplate(otp);

  await sendEmail(admin.email, admin.name, html, "Forgot Pasword Email");

  res.status(200).json({
    message: "Email sent",
  });
};

const resendForgotPassword = async (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  const admin = await Admin.findByEmail(email);
  if (!admin) {
    throw new AppError("User not found", 404);
  }

  if (!admin.forgot_token) {
    throw new AppError("There is no requested otp", 400);
  }

  const date = new Date();
  const forgotCreatedAT = new Date(admin.forgot_created_at).getTime();

  const diff = (date - forgotCreatedAT) / (1000 * 60);

  if (diff < 2) {
    throw new AppError("Please wait for 2 minutes", 400);
  }

  const otp = genOTP();
  await Admin.addForgotToken(admin.id, otp);

  const html = forgotPasswordEmailTemplate(otp);

  await sendEmail(admin.email, admin.name, html, "Forgot Pasword Email");

  res.status(200).json({
    message: "Email sent",
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

const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(204).json({});
};

const me = async (req, res) => {
  const response = {
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(response);
};

module.exports = {
  login,
  changePassword,
  logout,
  me,
  forgotPassword,
  resendForgotPassword,
};
