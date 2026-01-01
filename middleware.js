const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const {reviewSchema } = require("./schema.js");

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


  // jisne create kiya vahi edit kar skata
  module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currentUser._id)) {
      req.flash("error", "You are not the owner of this listing");
      return res.redirect(`/listings/${listing._id}`);
    }
    next();
  };

module.exports.validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body); // Validate the request body against the schema
    
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
};

module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body); // Validate the request body against the schema

    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
      req.flash("error", "You are not the author of this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
  };