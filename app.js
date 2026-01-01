if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const listingRouter = require("./routes/listing.js"); // Import the router
const reviewRouter = require("./routes/review.js"); // Import the router for reviews
const userRouter = require("./routes/user.js"); // Import the user router
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User.js");
// for calling main function

 const dbUrl = process.env.ATLASDB_URL ;
 
main()
  .then(() => {
    console.log("Connected to DB ");
  })
  .catch((err) => {
    console.log(err);
  });

 

//for create a db in mongodb
async function main() {
  await mongoose.connect(dbUrl);
}



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // data parse hone liye
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); // for using ejs mate
app.use(express.static(path.join(__dirname, "/public"))); // for using public folder

const sessionOptions = {
  secret:"mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    httpOnly: true,
  },
};

// app.get("/", (req, res) => {
//   res.send("Hi , I am a root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});



app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

// upar me se koi path se relate nhi huua to
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  //res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(4000, () => {
  console.log("App is Listening to port 4000");
});
