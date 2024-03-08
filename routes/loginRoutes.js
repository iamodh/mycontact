const express = require("express");

/* Controllers */
const {
  getLogin,
  loginUser,
  getRegister,
  registerUser,
  logout,
} = require("../controllers/loginController");

const router = express.Router();

router.route("/").get(getLogin).post(loginUser);
router.route("/register").get(getRegister).post(registerUser);
router.route("/logout").get(logout);

module.exports = router;
