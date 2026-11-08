const { Router } = require("express");
const { login, changePassword } = require("../controllers/auth.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

const router = Router();

// login
router.post("/login", login);
// forgot password
// resend forgot password email
// reset password
// change password
router.patch("/change-password", protectedRoute, changePassword);
// logout
// me

module.exports = router;
