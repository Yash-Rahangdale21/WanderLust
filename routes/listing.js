const express = require('express');
const router = express.Router();  // to  common route
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

const Listing = require("../models/listing.js");


const validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body); // Validate the request body against the schema
    
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
};

//Index Route
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

// New Route
router.get("/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs", { listing });
  })
);

//create route
router.post(
  "/",validateListing,
  wrapAsync(async (req, res, next) => {
    //let {title,desciption,image,price,location,country} = req.params;
    

    const newlisting = new Listing(req.body.listing);

    await newlisting.save();
    res.redirect("/listings");
  })
);

//Edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//Update route
router.put(
  "/:id",validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });
    res.redirect(`/listings/${listing._id}`);
  })
);

//Delete route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

module.exports = router;