const  express = require("express");
const app = express();
const mongoose  = require("mongoose");
const Listing = require("../MajorProject/models/listing");
const path = require("path");

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
app.post("/listings",async (req,res)=>{
    //let {title,desciption,image,price,location,country} = req.params;
   const newlisting =  new Listing(req.body.listing);
   await newlisting.save();
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

app.listen(8080,()=>{
    console.log("App is Listening to port 8080");
});
