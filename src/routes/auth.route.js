const { Router } = require("express");
const { login } = require("../controllers/auth.controller");

const router = Router();

// login
router.post("login", login)
// forgot password
// resend forgot password email
// reset password
// change password
// logout
// me

module.exports = router;
