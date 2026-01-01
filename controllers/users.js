const User = require("../models/User");


module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};


module.exports.signupForm = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      // Perform signup logic here (e.g., save user to database)
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to wanderlust you are logged in !!");
        res.redirect("/listings");
      });
      
    } catch (err) {
      req.flash("error", err.message);
      console.error(err);
      res.redirect("/signup");
    }
  };

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

  module.exports.loginForm = async (req, res) => {
    req.flash("success", "Welcome to wanderlust you are logged in !!");
    let  redirectUrl = res.locals.redirectUrl || "/listings"; // agar redirectUrl hai to vo lelo warna /listings pr chalo 
    res.redirect(redirectUrl); // particular page pr redirect ho jispr tap kiys tha vo 
  };

  module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/login");
  });
};