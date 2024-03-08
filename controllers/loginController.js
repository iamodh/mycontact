const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// @desc Get login
// @route Get /
const getLogin = (req, res) => {
  res.status(200).render("home");
};

// @desc Login user
// @route Post /
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "일치하는 사용자가 없습니다." }); // 이후 error alert 처리
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." }); // 이후 error alert 처리
  }
  const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret); // token 생성
  res.cookie("token", token, { httpOnly: true }); // token을 cookie에 저장
  res.redirect("/contacts");
});

// @desc Get register
// @route Get /register
const getRegister = (req, res) => {
  res.status(200).render("register");
};

// @desc Register user
// @route Post /register
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, password2 } = req.body;
  if (password !== password2) {
    res.send("패스워드를 다시 확인해주세요.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json({ message: "등록 성공", user });
});

// @desc Logout user
// @route Get /logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = { getLogin, loginUser, getRegister, registerUser, logout };
