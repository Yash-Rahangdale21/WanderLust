const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get( userController.renderSignupForm)
.post(
 wrapAsync(userController.signupForm)
);

//router.get("/signup", userController.renderSignupForm);

// router.post(
//   "/signup",
//   wrapAsync(userController.signupForm)
// );

router.route("/login")
.get( userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginForm
);

//router.get("/login", userController.renderLoginForm);

// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.loginForm
// );

router.get("/logout", userController.logout);

module.exports = router;
