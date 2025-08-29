const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
});

router.post("/signup", wrapAsync (async (req, res) => {
    try{
    let { username, email, password } = req.body;
    // Perform signup logic here (e.g., save user to database)
    const newUser  = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("success","User was registered");
    res.redirect("/login");
    }
    catch(err){
    req.flash("error", err.message);
    console.error(err);
    res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}),
async (req, res) => {
    req.flash("success", "Welcome to wanderlust you are logged in !!");
    res.redirect("/listings");
});

module.exports = router;