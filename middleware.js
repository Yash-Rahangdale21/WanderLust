module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      //redirect url  
      req.session.redirectUrl = req.originalUrl;  // konse url pr jana hai hume vo batayega 
      req.flash("error", "You must be logged in to create a listing");
      return res.redirect("/login");
    }
    next();
  };


  module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
  };