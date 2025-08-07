const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js"); // Import the router
const reviews = require("./routes/review.js"); // Import the router for reviews

// for calling main function
main()
  .then(() => {
    console.log("Connected to DB ");
  })
  .catch((err) => {
    console.log(err);
  });

//for create a db in mongodb
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // data parse hone liye
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); // for using ejs mate
app.use(express.static(path.join(__dirname, "/public"))); // for using public folder

app.get("/", (req, res) => {
  res.send("Hi , I am a root");
});




 
app.use("/listings",listings); 

app.use("/listings/:id/reviews",reviews);;


// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new villa",
//         desciptiom:"Bt the beech",
//         price:1220,
//         location:"Calcutta",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// })

// upar me se koi path se relate nhi huua to
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  //res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(2005, () => {
  console.log("App is Listening to port 2005");
});
