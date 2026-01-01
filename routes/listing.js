const express = require('express');
const router = express.Router();  // to  common route
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner ,validateListing} = require("../middleware.js");


// require controllers
const listingControllers = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
// multer ka use kar rahe file upload karne ke liye
const upload = multer({ storage });

// same router to merge kaar rahe 
router.route("/")
.get( wrapAsync(listingControllers.index))
.post(
isLoggedIn,upload.single('listing[image]'),validateListing,
  wrapAsync(listingControllers.createListing)
);


// New Route
router.get("/new", isLoggedIn,listingControllers.renderNewForm );


// in the path some route have /:id
router.route("/:id")
.get(
  wrapAsync(listingControllers.showListing)
)
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingControllers.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.deleteListing)
);


//Index Route
// router.get("/", wrapAsync(listingControllers.index));


//Show Route
// router.get(
//   "/:id",
//   wrapAsync(listingControllers.showListing)
// );

//create route
// router.post(
//   "/",isLoggedIn,validateListing,
//   wrapAsync(listingControllers.createListing)
// );

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.editRoute)
);

//Update route
// router.put(
//   "/:id",validateListing,
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingControllers.updateListing)
// );

//Delete route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingControllers.deleteListing)
// );

module.exports = router;