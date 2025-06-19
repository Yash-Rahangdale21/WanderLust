const  express = require("express");
const app = express();
const mongoose  = require("mongoose");
const Listing = require("../MajorProject/models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// for calling main function
main().then(() =>{
    console.log("Connected to DB ");
}).catch((err)=>{
    console.log(err);
});

//for create a db in mongodb 
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})) // data parse hone liye
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate); // for using ejs mate
app.use(express.static(path.join(__dirname,"/public"))); // for using public folder

app.get("/",(req,res)=>{
    res.send("Hi , I am a root");
});

//Index Route
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

// New Route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});



//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
    
});

//create route 
app.post("/listings",async (req,res,next)=>{
    //let {title,desciption,image,price,location,country} = req.params;
   
   try{
     const newlisting =  new Listing(req.body.listing);
   await newlisting.save();
res.redirect("/listings");
   }catch(err){
       next(err);
   }
});

//Edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});


//Update route
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${listing._id}`);
});

//Delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});



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

app.use((err,req,res,next)=>{
    res.send("something went wrong");
});

app.listen(2005,()=>{
    console.log("App is Listening to port 2005");
});
