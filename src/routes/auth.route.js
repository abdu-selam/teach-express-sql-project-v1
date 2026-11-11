const { Router } = require("express");
const {
  login,
  changePassword,
  logout,
  me,
  forgotPassword,
  resendForgotPassword,
} = require("../controllers/auth.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

const router = Router();

// login
router.post("/login", login);
// forgot password
router.post("/forgot-password", forgotPassword);
// resend forgot password email
router.patch("/resend-forgot", resendForgotPassword);
// reset password
// change password
router.patch("/change-password", protectedRoute, changePassword);
// logout
router.delete("/logout", protectedRoute, logout);
// me
router.get("/me", protectedRoute, me);

module.exports = router;
