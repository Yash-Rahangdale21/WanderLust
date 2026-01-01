const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
}

module.exports.renderNewForm  = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(req.params.id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
      req.flash("error","Listing not found");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing, currentUser: req.user });
  };

module.exports.createListing = async (req, res, next) => {
      //let {title,desciption,image,price,location,country} = req.params;
      let url = req.file.path;
      let filename = req.file.filename;
      console.log(url + filename);
      const newlisting = new Listing(req.body.listing);
      newlisting.owner = req.user._id;
      newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","New Listing is created");
      res.redirect("/listings");
    };

module.exports.editRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing not found");
      res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/uploads","/uploads/w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
  };

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
   
     let listing  = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing
    });
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = {url,filename};
    await listing.save();
    }
    req.flash("success","Listing  updated");
    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing  deleted");
    res.redirect("/listings");
  };